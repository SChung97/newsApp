import { Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import Home from "./components/Home";
import Topics from "./components/Topics";
import Article from "./components/Article";
import FilteredTopics from "./components/FilteredTopics";
import Footer from "./components/Footer";
import NotFound from "./components/NotFound";
import Users from "./components/Users";

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/users" element={<Users />}></Route>
        <Route path="/topics" element={<Topics />}></Route>
        <Route path="/topics/:topic_slug" element={<FilteredTopics />}></Route>
        <Route path="/articles/:article_id" element={<Article />}></Route>
        <Route
          path="/topics/:topic_slug/articles/:article_id"
          element={<Article />}
        ></Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
    </>
  );
}
export default App;
