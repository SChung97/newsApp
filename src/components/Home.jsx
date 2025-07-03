import { getAllArticles } from "../api";
import { useContext, useEffect, useState } from "react";
import "../App.css";
import { TopicContext } from "../components/context/TopicContext";
import { Link, useSearchParams } from "react-router-dom";

function Home() {
  const { selectedTopic, handleTopic } = useContext(TopicContext);

  const [allArticles, setAllArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(null);
  const [searchParams, setSearchParams] = useSearchParams();
  const [sortedArticles, setSortedArticles] = useState([]);
  console.log("rendering all articles");

  const sortBy = searchParams.get("sort_by") || "created_at";
  const orderBy = searchParams.get("order_by") || "desc";

  useEffect(() => {
    console.log("all articles useEffect fired");
    setIsLoading(true);
    setIsError(null);

    getAllArticles()
      .then((articleList) => {
        setAllArticles(articleList);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching articles", error);
      });
  }, []);

  useEffect(() => {
    if (!allArticles) {
      setSortedArticles([]);
      return;
    }
    const unsortedArticles = [...allArticles];

    unsortedArticles.sort((a, b) => {
      let articleA = a[sortBy];
      let articleB = b[sortBy];

      if (sortBy === "created_at") {
        articleA = new Date(articleA).getTime();
        articleB = new Date(articleB).getTime();
      }

      if (articleA < articleB) {
        return orderBy === "asc" ? -1 : 1;
      }
      if (articleA > articleB) {
        return orderBy === "asc" ? 1 : -1;
      }
      return 0;
    });
    setSortedArticles(unsortedArticles);
  }, [allArticles, sortBy, orderBy]);

  const handleSort = (event) => {
    const newSearchParams = new URLSearchParams(searchParams);
    newSearchParams.set("sort_by", event.target.value);
    setSearchParams(newSearchParams);
  };

  const handleOrder = (event) => {
    const newSearchParams = new URLSearchParams(searchParams);
    newSearchParams.set("order_by", event.target.value);
    setSearchParams(newSearchParams);
  };

  useEffect(() => {
    if (selectedTopic !== null) {
      handleTopic(null);
    }
  }, [selectedTopic, handleTopic]);

  if (isLoading) {
    return <p>Loading articles</p>;
  }
  if (isError) {
    return <p>Error loading articles</p>;
  }
  if (allArticles.length === 0) {
    return <p>No articles found!</p>;
  }

  return (
    <>
      <section>
        <div className="sort-dropdown">
          <label htmlFor="sort-by">Sort by:</label>
          <select id="sort-by" value={sortBy} onChange={handleSort}>
            <option value="created_at">Date</option>
            <option value="comment_count">Comment Count</option>
            <option value="votes">Votes</option>
          </select>

          <label htmlFor="order-by">Order by:</label>
          <select id="order-by" value={orderBy} onChange={handleOrder}>
            <option value="desc">Descending</option>
            <option value="asc">Ascending</option>
          </select>
        </div>
      </section>
      <section>
        <ul className="articles-list">
          {sortedArticles.map((article) => {
            return (
              <li key={article.article_id} className="article-list-item">
                <div className="article-list-text">
                  <Link
                    to={`/articles/${article.article_id}`}
                    className="article-title-link"
                  >
                    <h3>{article.title}</h3>
                  </Link>
                  <p>
                    <Link
                      to={`/topics/${article.topic}`}
                      className="home-topic-link"
                    >
                      {article.topic}{" "}
                    </Link>
                  </p>

                  <p>{article.author}</p>
                  <img
                    className="article_img"
                    src={article.article_img_url}
                    alt={article.title}
                  />

                  <p>Comment count: {article.comment_count}</p>
                  <p>Votes: {article.votes}</p>
                </div>
                <p className="homepage-date">
                  {new Date(article.created_at).toLocaleDateString()}
                </p>
              </li>
            );
          })}
        </ul>
      </section>
    </>
  );
}
export default Home;
