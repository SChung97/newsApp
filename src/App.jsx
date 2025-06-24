import { Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import Home from "./components/Home";
import theme from "../theme";
import { CssBaseline, ThemeProvider } from "@mui/material";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <>
        <Header />
        <Routes>
          <Route path="/" element={<Home />}></Route>
        </Routes>
      </>
    </ThemeProvider>
  );
}
export default App;
