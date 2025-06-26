import { Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import Home from "./components/Home";
import Topics from "./components/Topics";
import Article from "./components/Article";


function App() {
  
  return (


      <>
        <Header />
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path='/topics' element={<Topics />}></Route>
          <Route path="/articles/:article_id" element={<Article />}></Route>
        </Routes>
      </>

  );
}
export default App;
