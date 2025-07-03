import { Link } from "react-router-dom";
import "../App.css";
import { AppBar, Toolbar, Typography, Box } from "@mui/material";

function Header() {
  return (
    <>
      <AppBar position="static" color="" sx={{ mb: 3 }}>
        <Toolbar sx={{ minHeight: { xs: "48px", sm: "56px", md: "60px" } }}>
          <Typography
            variant="h4"
            component="h1"
            sx={{ flexGrow: 1, lineHeight: 1, fontWeight: "bold" }}
          >
            <Link to="/" className="title-link-to-home">
              NC NEWS
            </Link>
          </Typography>
          <Box sx={{ display: "flex", gap: "20px", alignItems: "center" }}>
            <Typography
              variant="subtite1"
              component="h2"
              sx={{ lineHeight: 1 }}
            >
              <Link to="/topics" className="link-to-topics">
                Topics
              </Link>
            </Typography>
            <Typography
              variant="subtite1"
              component="h2"
              sx={{ lineHeight: 1 }}
            >
              <Link to="/users" className="link-to-users">
                Users
              </Link>
            </Typography>
          </Box>
        </Toolbar>
      </AppBar>
    </>
  );
}

export default Header;
