import { Link } from "react-router-dom";
import "../App.css";
import { AppBar } from "@mui/material";

function Header() {
  return (
    <>
      <AppBar position="static" color="">
        <header className="header">
          <h1>
            <Link to="/" className="title-link-to-home">
              NC NEWS
            </Link>
          </h1>
          <h2>
            <Link to="/topics" className="link-to-topics">
              Topics
            </Link>
          </h2>
          <h2>
            <Link to="/users" className="link-to-users">
              Users
            </Link>
          </h2>
        </header>
      </AppBar>
    </>
  );
}

export default Header;
