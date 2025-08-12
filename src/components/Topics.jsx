import { getAllTopics } from "../api";
import { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import "../App.css";
import { TopicContext } from "./context/TopicContext";
import Loading from "./Loading";

function Topics() {
  const { selectedTopic, handleTopic } = useContext(TopicContext);

  const [allTopics, setAllTopics] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(null);
  console.log("rendering all Topics");

  useEffect(() => {
    console.log("all topics useEffect fired");
    setIsLoading(true);
    setIsError(false);

    getAllTopics()
      .then((topicsList) => {
        setAllTopics(topicsList);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching topics", error);
        setIsError(true);
        setIsLoading(false);
      });
  }, []);

  const handleTopicSelect = (slug) => {
    handleTopic(slug);
  };

  if (isLoading) {
    return <Loading />;
  }
  if (isError) {
    return <p>Error loading topics</p>;
  }
  if (!allTopics || allTopics.length === 0) {
    return <p>No topics to display</p>;
  }

  return (
    <>
      <nav className="topics-nav">
        <Link
          to="/"
          onClick={() => handleTopicClick(null)}
          className={!selectedTopic ? "active-link" : "topic-link"}
        >
          <h1>All Articles</h1>
        </Link>
        {allTopics.map((topic) => {
          return (
            <div key={topic.slug} className="topics-page">
              <Link
                to={`/topics/${topic.slug}`}
                onClick={() => handleTopicSelect(topic.slug)}
                className={
                  selectedTopic === topic.slug ? "active-link" : "topic-link"
                }
              >
                <h2>{topic.slug}</h2>
              </Link>
              <p>{topic.description}</p>
              <img className="topic-img" src={topic.img_url} alt={topic.slug} />
            </div>
          );
        })}
      </nav>
    </>
  );
}

export default Topics;
