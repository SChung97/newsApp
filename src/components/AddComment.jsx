import { makeComment } from "../api";
import { useContext, useState } from "react";
import { UserContext } from "./context/UserContext";
import { Button } from "@mui/material";
import "../App.css";
import SendIcon from "@mui/icons-material/Send";

function AddComment({ article_id, onNewComment }) {
  const { loggedInUser } = useContext(UserContext);
  const [commentBody, setCommentBody] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionError, setSubmissionError] = useState(null);
  const [credentialsError, setCredentialsError] = useState(null);

  const username = loggedInUser ? loggedInUser.username : null;

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!loggedInUser) {
      setCredentialsError("Please log in to post a comment");
    } else {
      setCredentialsError(null);
    }

    if (!commentBody.trim("")) {
      setError("Cannot post an empty comment, please try again!");
      return;
    }
    setSubmissionError(null);
    setIsSubmitting(true);

    makeComment(article_id, username, commentBody)
      .then((newComment) => {
        setCommentBody("");
        setIsSubmitting(false);
        if (onNewComment) {
          onNewComment(newComment);
        }
      })
      .catch((error) => {
        console.error("Comment can't be posted at this time", error);
        setIsSubmitting(false);
        setSubmissionError(
          error.msg || "Failed to post comment, please try again"
        );

        if (error.response.status === 400) {
          setSubmissionError("Invalid format or missing thoughts");
        } else if (error.response.status === 404) {
          setSubmissionError("Please login to post a comment!");
        }
      });
  };
  return (
    <section className="add-comment-container">
      <form onSubmit={handleSubmit}>
        <label htmlFor="commentInput">Your thoughts:</label> {" "}
        <textarea
          id="commentInput"
          value={commentBody}
          onChange={(e) => setCommentBody(e.target.value)}
          placeholder="Type here..."
          required
          disabled={isSubmitting}
          aria-label="Enter your comment here"
        ></textarea> {" "}

        <Button className="submit-button" color="black" variant="outlined" size="small" type="submit" endIcon={<SendIcon />} disabled={isSubmitting}>
          Submit
        </Button>
        {submissionError && <p className="Error-message">{submissionError}</p>}
      </form>
    </section>
  );
}
export default AddComment;
