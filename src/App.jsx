import { Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import Home from "./components/Home";

import Article from "./components/Article";


function App() {
  return (


      <>
        <Header />
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/articles/:article_id" element={<Article />}></Route>
        </Routes>
      </>

  );
}
export default App;
