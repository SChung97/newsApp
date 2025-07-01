import { useContext } from "react";
import { UserContext } from "./context/UserContext";

function Users() {
  const { users, loadingUsers, userError, loggedInUser, setLoggedInUser } =
    useContext(UserContext);

  const handleLogIn = (user) => {
    console.log(user);
  };

  if (loadingUsers) {
    return <p>Loading users</p>;
  }

  if (userError) {
    return <p>Error loading users</p>;
  }

  return (
    <>
      <section>
        <ul className="users-list">
          {users.map((user) => {
            return (
              <li key={user.username}>
                <h3>{user.username}</h3>
                <img
                  onClick={handleLogIn}
                  className="user-img"
                  src={user.avatar_url}
                  alt={user.username}
                />
              </li>
            );
          })}
        </ul>
      </section>
    </>
  );
}
export default Users;
