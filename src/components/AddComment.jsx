
import { makeComment } from "../api"
import { useState } from "react"

function AddComment({article_id, onNewComment}) {
    const [username] = useState('jessjelly')
    const [commentBody, setCommentBody] = useState('')
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [error, setError] = useState(null)

    const handleSubmit = (event) => {
        event.preventDefault()
        if (!commentBody.trim('')) {
            setError('Cannot post an empty comment, please try again!')
            return 
        }
        setError(null)
        setIsSubmitting(true)
        
        makeComment(article_id, commentBody, username).then((newComment) => {
            setCommentBody('')
            setIsSubmitting(false)
            if(onNewComment) {
                onNewComment(newComment)
            }
        }).catch((error) => {
            console.error('Comment can\'t be posted at this time', error)
            setIsSubmitting(false)
            setError('Failed to post comment, please, try again')
        })
    }
    return (
        <section className="add-comment-container">
            <form onSubmit={handleSubmit}>
                <label htmlFor="commentInput">Your thoughts:</label>
                <textarea id='commentInput' value={commentBody} onChange={(e) => setCommentBody(e.target.value)}
                placeholder="Type here..." required disabled={isSubmitting}></textarea>
            
            <button type='submit' disabled={isSubmitting}>Submit</button>
            {error && <p className="Error-message">{error}</p>}
            </form>
        </section>
    )
}
export default AddComment