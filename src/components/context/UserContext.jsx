import { createContext, useState, useEffect } from "react";
import { getAllUsers } from "../../api";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [loggedInUser, setLoggedInUser] = useState(() => {
    try {
      const userData = localStorage.getItem("nc_news_user");
      return userData ? JSON.parse(userData) : null;
    } catch (error) {
      console.error("failed at storing userData", error);
      localStorage.removeItem("nc_news_user");
      return null;
    }
  });

  useEffect(() => {
    if (loggedInUser) {
      localStorage.setItem("nc_news_user", JSON.stringify(loggedInUser));
    } else {
      localStorage.removeItem("nc_news_user");
    }
  }, [loggedInUser]);

  const [users, setUsers] = useState([]);
  const [loadingUsers, setLoadingUsers] = useState(true);
  const [userError, setUserError] = useState(null);

  useEffect(() => {
    setLoadingUsers(true);
    setUserError(null);

    getAllUsers()
      .then((users) => {
        setUsers(users);
        setLoadingUsers(false);
      })
      .catch((error) => {
        console.error("Error fetching users", error);
        setUserError(error);
      });
  }, []);

  function loggedIn(userLoggedin) {
    setLoggedInUser(userLoggedin);
    localStorage.setItem("nc_news_user", JSON.stringify(userLoggedin));
  }

  function loggedOut() {
    setLoggedInUser(null);
    localStorage.removeItem("nc_news_user");
  }
  return (
    <UserContext.Provider
      value={{
        loggedInUser,
        setLoggedInUser,
        users,
        loadingUsers,
        userError,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
