import { deleteComment } from "../api";
import { useState, useContext } from "react";
import { Button , Avatar} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { UserContext } from "./context/UserContext";

function CommentCard({ comment, currentUser, deleteSuccess }) {
  const { users } = useContext(UserContext)
  const [isDeleting, setIsDeleting] = useState(false);
  const [deleteError, setDeleteError] = useState(null);
  const [isHidden, setIsHidden] = useState(false);

  const username = users.find((user) => user.username === comment.author)

  const avatar = users.find((user) => user.username === comment.author)?.avatar_url || `${comment.author}'s avatar`

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
        <div className="comment-info">
        <Avatar src={avatar} sx={{margin: 2, width: 30, height: 30
        }}
        alt={`${comment.author}'s avatar`}
        /> <h5>{comment.author}</h5>
   </div>     
        <p className="comment-card-date">{comment.created_at}</p>

        <p>{comment.body}</p>
        <p>Votes: {comment.votes}</p>

        {canDelete && (
          <Button className="delete-button" variant="outlined" size="small" startIcon={<DeleteIcon />} color="black" onClick={handleDelete} disabled={isDeleting}>
            Delete
          </Button>
        )}
        {deleteError && <p>{deleteError}</p>}
      </li>
    </>
  );
}
export default CommentCard;
