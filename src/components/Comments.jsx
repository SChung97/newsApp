import { useContext } from "react";
import "../App.css";
import CommentCard from "./CommentCard";
import { UserContext } from "./context/UserContext";
import Loading from "./Loading";

function Comments({ comments, loadingComments, commentsError, setComments }) {
  const { loggedInUser } = useContext(UserContext);
  console.log("CommentsList rendering.");
  console.log("comments prop", comments);
  console.log("userContext", loggedInUser);
  const handleDeleteComment = (commentIdToRemove) => {
    setComments((currentComments) =>
      currentComments.filter(
        (comment) => comment.comment_id !== commentIdToRemove
      )
    );
  };

  if (loadingComments) {
    return <Loading />;
  }
  if (commentsError) {
    return <p>Error loading comments</p>;
  }

  if (!comments || comments.length === 0) {
    return <p>No comments to display, add your thoughts!</p>;
  }

  return (
    <section className="comments-section">
      <h4>All Comments</h4>
      <ul className="comments-list">
        {comments.map((comment) => {
          return (
            <CommentCard
              key={comment.comment_id}
              comment={comment}
              currentUser={loggedInUser}
              deleteSuccess={handleDeleteComment}
            />
          );
        })}
      </ul>
    </section>
  );
}

export default Comments;
