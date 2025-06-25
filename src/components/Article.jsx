import { getSingleArticle } from "../api";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ArticleVotes from "./ArticleVotes";
import "../App.css";
import Comments from "./Comments";
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

  
  return (
    <>
      <section className="article-card">
        
            <li key={article.article_id}>
              <h3>{article.title}</h3>
              <h4>{article.topic}</h4>
              <p>Author: {article.author}</p>
              <p>{article.created_at}</p>
              <img
                className="article_img"
                src={article.article_img_url}
                alt={article.title}
              />
              <p>{article.body}</p>
              <ArticleVotes article_id={article_id} initialVotes={article.votes}/>
              <p>Comment count: {article.comment_count}</p>
              <Comments article_id={article_id} />
              
            </li>
          
      </section>
    </>
  );
}
export default Article;
