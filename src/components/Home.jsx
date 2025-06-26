import { getAllArticles } from "../api";
import { useContext, useEffect, useState } from "react";
import "../App.css";
import { TopicContext} from '../components/context/TopicContext'
import { Link, useSearchParams } from "react-router-dom";


function Home() {
  const {selectedTopic, handleTopic} = useContext(TopicContext)

  const [searchParams, setSearchParams] = useSearchParams()

  const [allArticles, setAllArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(null);
  console.log("rendering all articles");

  const topicFromUrl = searchParams.get('topic')

  useEffect(() => {
    console.log("all articles useEffect fired");
    setIsLoading(true);
    setIsError(null);

    getAllArticles()
      .then((articleList) => {
        setAllArticles(articleList);
        setIsLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching articles", err);
      });
  }, []);

  useEffect(() => {
    if (topicFromUrl && topicFromUrl !== selectedTopic) {
      handleTopic(topicFromUrl)
    } else if (!selectedTopic && topicFromUrl) {
      handleTopic({topic: selectedTopic})
    } else if 
      (!selectedTopic && !topicFromUrl) {
        setSearchParams({})
      }
    }, [selectedTopic, topicFromUrl, handleTopic, setSearchParams])
  

const filteredArticles = selectedTopic ? allArticles.filter(article => article.topic === selectedTopic) : allArticles

  if (isLoading) {
    return <p>Loading articles</p>;
  }
  if (isError) {
    return <p>Error loading articles</p>;
  }
  if (filteredArticles.length === 0) {
    return <p>No articles match this topic!</p>
  }

  return (
    <>
      <section>
        {selectedTopic && <h2>Articles about {selectedTopic}</h2>}
        <ul className="articles-list">
          {filteredArticles.map((article) => {
            return (
              <li
                key={article.article_id}
                className="article-list-item">
                <Link to={`/articles/${article.article_id}`} className='article-title-link'>
                <h3>{article.title}</h3>
                </Link>
                <p><Link to={`/?topic=${article.topic}`} onClick={() => handleTopic(article.topic)}className='home-topic-link' >{article.topic} </Link></p>
                
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
