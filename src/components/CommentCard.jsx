import { deleteComment } from "../api";
import { useState } from "react";
import { Button } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

function CommentCard({ comment, currentUser, deleteSuccess }) {
  const [isDeleting, setIsDeleting] = useState(false);
  const [deleteError, setDeleteError] = useState(null);
  const [isHidden, setIsHidden] = useState(false);

  const canDelete = currentUser && currentUser.username === comment.author;

  const handleDelete = () => {
    setIsDeleting(true);
    setDeleteError(null);

    deleteComment(comment.comment_id)
      .then(() => {
        setIsDeleting(false);
        setIsHidden(true);

        if (deleteSuccess) {
          deleteSuccess(comment.comment_id);
        }
      })
      .catch((error) => {
        console.error("Error, unable to delete comment", error);
        setIsDeleting(false);
        setDeleteError(
          error.msg || "Cannot delete comment at this time, please try again!"
        );
      });
  };
  if (isHidden) {
    return <p>Comment removed</p>;
  }

  return (
    <>
      <li className="comment-card">
        <h5>{comment.author}</h5>
        <p>{comment.created_at}</p>
        <p>{comment.body}</p>
        <p>Votes: {comment.votes}</p>

        {canDelete && (
          <Button variant="outlined" size="small" startIcon={<DeleteIcon />} onClick={handleDelete} disabled={isDeleting}>
            Delete
          </Button>
        )}
        {deleteError && <p>{deleteError}</p>}
      </li>
    </>
  );
}
export default CommentCard;
