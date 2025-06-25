import { BrowserRouter } from "react-router-dom";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import theme from "../theme";
import { CssBaseline, ThemeProvider } from "@mui/material";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
  <ThemeProvider theme={theme}>
    <CssBaseline />
    <App /></ThemeProvider>
    
  </BrowserRouter>
);
