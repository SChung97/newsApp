import { Button } from "@mui/material";
import { Link } from "react-router-dom";
function Header({ list }) {
  return (
    <>
      <section className="header">
        <h1>NC NEWS</h1>
        <h2>
          <Button color="inherit" component={Link} to="/">
            Home
          </Button>
        </h2>
        <h2>Topics</h2>
      </section>
    </>
  );
}

export default Header;
