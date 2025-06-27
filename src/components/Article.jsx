import { getSingleArticle, getAllComments } from "../api";
import { useEffect, useState, useContext } from "react";
import { useParams, Link } from "react-router-dom";
import ArticleVotes from "./ArticleVotes";
import "../App.css";
import Comments from "./Comments";
import AddComment from "./AddComment";
import { TopicContext } from "./context/TopicContext";


function Article() {
const {handleTopic} = useContext(TopicContext)
  const { article_id } = useParams();
  const [article, setArticle] = useState(null);
  const [comments, setComments] = useState([])
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(null);

const [loadingComments, setLoadingComments] = useState(true)
const [commentsError, setCommentsError] = useState(null)
  const [showCommentsForm, setShowCommentsForm] = useState(false)

console.log('rendering comments')
  console.log("rendering article");
  const currentUser = 'tickle122'

  useEffect(() => {
    console.log("single article useEffect fired");
    setIsLoading(true);
    setIsError(null);

    getSingleArticle(article_id).then((article) => {
      setArticle(article);
      setIsLoading(false);
    }).catch((error) => {
      console.error('Error fetching article, please try again!', error)
      setIsLoading(false)
      setIsError('Failed, to load article, please try again!')
    });
  }, [article_id]);

 
  useEffect(() => {
     console.log('comments useEffect fired')
     setLoadingComments(true)
     setCommentsError(null)
 
     getAllComments(article_id).then((comments) => {
     console.log('api call comments success')
     console.log('fetched comments data')
         setComments(comments)
         setLoadingComments(false)
     })
     .catch((error) => {
      console.error('Error loading api call comments', error)
      setLoadingComments(false)
      setCommentsError('Failed to load comments, please try again!')
     })
  }, [article_id]);

  const handleNewComment = (postComment) => {
    setComments((currentComments) => [postComment , ...currentComments ])
    setShowCommentsForm(false)
  }

  const handleCommentForm = () => {
    setShowCommentsForm((currentValue) => !currentValue)
  }

  const handleArticleTopicClick = (slug) => {
    handleTopic(slug)
  }

  if (isLoading) {
    return <p>Loading article</p>;
  }
  if (isError) {
    return <p>Error loading article</p>;
  }
  if (!article_id) {
    return <p>Article not found!</p>
  }
  
  return (
    <>
      <section className="article-page">
        
            <div key={article.article_id}>
              <h3>{article.title}</h3>
              <h4><Link to={`/topics/${article.topic}`} onClick={() => handleArticleTopicClick(article.topic)} className="article-topic-link">{article.topic}</Link></h4>
              <p>Author: {article.author}</p>
              <p>{new Date(article.created_at).toLocaleDateString()}</p>
              <img
                className="article_img"
                src={article.article_img_url}
                alt={article.title}
              />
              <p>{article.body}</p>
              <ArticleVotes article_id={article.article_id} initialVotes={article.votes}/>
              <p>Comment count: {article.comment_count}</p>
              <Comments comments={comments} currentUser={currentUser} loadingComments={loadingComments} commentsError={commentsError} setComments={setComments}/>
              <button onClick={handleCommentForm}>{showCommentsForm ? 'Hide' : 'Add your thoughts here!'}</button>
              {showCommentsForm && (<AddComment article_id={article.article_id} onNewComment={handleNewComment}/>)}
              
            </div>
          
      </section>
    </>
  );
}
export default Article;
