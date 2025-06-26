
import '../App.css'
import CommentCard from './CommentCard';
function Comments({comments, loadingComments, commentsError, currentUser, setComments}) {
    console.log('CommentsList rendering.'); 
    console.log('comments prop', comments)
console.log(currentUser)

const handleDeleteComment = (commentIdToRemove) => {
    setComments((currentComments) => currentComments.filter((comment) => comment.comment_id !== commentIdToRemove))
}

 if (loadingComments) {
    return <p>Loading comments</p>
 }
 if(commentsError) {
    return <p>Error loading comments</p>
 }

if (!comments || comments.length===0) {
    return <p>No comments to display, add your thoughts!</p>
}

return (<section className='comments-section'>
    <h4>All Comments</h4>
    <ul className='comments-list'>
        {comments.map((comment) => {
           return(<CommentCard key={comment.comment_id} comment={comment} currentUser={currentUser} deleteSuccess={handleDeleteComment} />) 
        })}
    </ul>
</section>)
    
}

export default Comments