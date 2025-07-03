import { getAllTopics } from "../api";
import { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import "../App.css";
import { TopicContext } from "./context/TopicContext";

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
    return <p>Loading topics</p>;
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
          <h3>All Articles</h3>
        </Link>
        {allTopics.map((topic) => {
          return (
            <div key={topic.slug}>
              <Link
                to={`/topics/${topic.slug}`}
                onClick={() => handleTopicSelect(topic.slug)}
                className={
                  selectedTopic === topic.slug ? "active-link" : "topic-link"
                }
              >
                <h4>{topic.slug}</h4>
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
