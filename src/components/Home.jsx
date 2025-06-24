import { getAllArtictles } from "../api";
import { useEffect, useState } from "react";
function Home() {
  const [allArticles, setAllArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(null);
  console.log("rendering all articles");
  useEffect(() => {
    console.log("useEffect fired");
    setIsLoading(true);
    setIsError(null);

    getAllArtictles()
      .then((articleList) => {
        setAllArticles(articleList);
        setIsLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching articles", err);
      });
  }, []);
  if (isLoading) {
    return <p>Loading articles</p>;
  }
  if (isError) {
    return <p>Error loading articles</p>;
  }
  return (
    <>
      <section className="articles-list">
        <ul>
          {allArticles.map((article) => {
            console.log(article);
            return (
              <li
                key={article.article_id}
                topic={article.topic}
                title={article.title}
                author={article.author}
                image={article.article_img_url}
                comments={article.comment_count}
                votes={article.votes}
                date_created={article.created_at}
              >
                <p>{article.topic}</p>
                <h3>{article.title}</h3>
                <p>{article.author}</p>
                <img
                  className="article_img"
                  src={article.article_img_url}
                  alt={article.title}
                />
                <p>Comment count: {article.comment_count}</p>
                <p>Votes: {article.votes}</p>
                <p>{article.created_at}</p>
              </li>
            );
          })}
        </ul>
      </section>
    </>
  );
}
export default Home;
