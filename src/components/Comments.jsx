
import '../App.css'

function Comments({comments, loadingComments, commentsError}) {
    console.log('CommentsList rendering.'); 



 if (loadingComments) {
    return <p>Loading comments</p>
 }
 if(commentsError) {
    return <p>Error loading comments</p>
 }


return (
    <>
    <section className="comments-section">
        <ul className='comments-list'>
            {comments.map((comment) => {
                return (
                    <li key={comment.comment_id} >
                        <h4>{comment.author}</h4>
                        <p>{comment.created_at}</p>
                        <p>{comment.body}</p>
                        <p>Votes: {comment.votes}</p>
                    </li>
                )
            })}
        </ul>
    </section>
    </>
)
}

export default Comments