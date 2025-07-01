import { BrowserRouter } from "react-router-dom";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import theme from "../theme";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { TopicProvider } from "./components/context/TopicContext.jsx";
import { UserProvider } from "./components/context/UserContext.jsx";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <TopicProvider>
        <UserProvider>
          <App />
        </UserProvider>
      </TopicProvider>
    </ThemeProvider>
  </BrowserRouter>
);
