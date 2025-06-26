
import { patchArticleVotes } from "../api"
import { useState } from "react"

function ArticleVotes({article_id, initialVotes}) {

const [votes, setVotes] = useState(initialVotes)
const [error, setError] = useState(null)
const [userVote, setUserVote] = useState(0)

const handleVote = (voteType) => {
    setError(null)
    const originalVotes = votes
    const originalUserVote = userVote
    
let increment = 0;
if(voteType === userVote) {
    setError(null)
    increment = -voteType
    setUserVote(0)
    setVotes((currentVotes) => currentVotes + increment)
} else {
    increment = voteType - userVote
    setUserVote(voteType)
    setVotes((currentVotes) => currentVotes + increment)
}

    patchArticleVotes(article_id, increment).then(() => {
      
    }).catch((error)=>{
        console.error('Failed to update votes, please try again!', error)
        setVotes(originalVotes)
        setUserVote(originalUserVote)
        setError(true)
    })
}
return (
    <>
    <section className="article-votes-container">
        <p>Votes: {votes}</p>
        <button className='votes-button' onClick={() => handleVote(1)}>{userVote === 1 ? 'Upvoted' : 'Upvote'}</button>
        <button className="votes-button" onClick={() => handleVote(-1)}>
            {userVote === -1 ? 'Downvoted' : 'Downvote'}
        </button>
    </section>
    </>
)
}

export default ArticleVotes