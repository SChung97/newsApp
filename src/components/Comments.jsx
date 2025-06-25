import { getAllComments } from "../api"
import { useState, useEffect } from "react"
import '../App.css'

function Comments({article_id}) {

 const [allComments, setAllComments] = useState([])  
 const [isLoading, setIsLoading] = useState(true)
 const [isError, setIsError] = useState(null)
console.log('rendering comments')
 useEffect(() => {
    console.log('comments useEffect fired')
    setIsLoading(true)
    setIsError(null)

    getAllComments(article_id).then((comments) => {
        setAllComments(comments)
        setIsLoading(false)
    })
 }, [article_id]);
 if(isLoading) {
    return <p>Loading comments</p>
 }
 if(isError) {
    return <p>Error loading comments</p>
 }


return (
    <>
    <section>
        <ul className='comments-list'>
            {allComments.map((comment) => {
                return (
                    <li key={comment.comment_id} author={comment.author} date_created={comment.created_at} body={comment.body} votes={comment.votes}>
                        <h4>{comment.author}</h4>
                        <p>{comment.created_at}</p>
                        <p>{comment.body}</p>
                        <p>{comment.votes}</p>
                    </li>
                )
            })}
        </ul>
    </section>
    </>
)
}

export default Comments