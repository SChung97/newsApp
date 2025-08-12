import { useContext } from "react";
import { UserContext } from "./context/UserContext";
import Loading from "./Loading";

function Users() {
  const { users, loadingUsers, userError, loggedInUser, setLoggedInUser } =
    useContext(UserContext);

  if (loadingUsers) {
    return <Loading />;
  }

  if (userError) {
    return <p>Error loading users</p>;
  }

  return (
    <>
      <section>
        {loggedInUser ? (
          <p>You are now logged in as {loggedInUser.username}</p>
        ) : (
          <p>Click an avatar to log in!</p>
        )}
        <ul className="users-list">
          {users.map((user) => {
            return (
              <li key={user.username}>
                <h3>{user.username}</h3>
                <img
                  className="user-img"
                  src={user.avatar_url}
                  alt={user.username}
                  onClick={() => setLoggedInUser(user)}
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
