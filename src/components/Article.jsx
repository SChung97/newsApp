import { getSingleArticle } from "../api";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "../App.css";
function Article() {
  const { article_id } = useParams();
  const [article, setArticle] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(null);
  console.log("rendering article");
  useEffect(() => {
    console.log("single article useEffect fired");
    setIsLoading(true);
    setIsError(false);

    getSingleArticle(article_id).then((article) => {
      setArticle(article);
      setIsLoading(false);
    });
  }, [article_id]);
  if (isLoading) {
    return <p>Loading article</p>;
  }
  if (isError) {
    return <p>Error loading article</p>;
  }
  const articleArray = [article];
  return (
    <>
      <section className="article-card">
        {articleArray.map((singleArticle) => {
          return (
            <li key={singleArticle.article_id}>
              <h3>{singleArticle.title}</h3>
              <h4>{singleArticle.topic}</h4>
              <p>Author: {singleArticle.author}</p>
              <p>{singleArticle.created_at}</p>
              <img
                className="article_img"
                src={singleArticle.article_img_url}
                alt={singleArticle.title}
              />
              <p>{singleArticle.body}</p>
              <p>Comment count: {singleArticle.comment_count}</p>
              <p>Votes: {singleArticle.votes}</p>
            </li>
          );
        })}
      </section>
    </>
  );
}
export default Article;
