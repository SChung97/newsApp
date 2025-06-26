import { getAllTopics } from "../api"
import { useEffect, useState } from "react"
import '../App.css'

function Topics() {
 const [allTopics, setAllTopics] = useState([])
const [isLoading, setIsLoading] = useState(true)
const [isError, setIsError] = useState(null)
console.log('rendering all Topics')

useEffect(() => {
    console.log('all topics useEffect fired')
    setIsLoading(true)
    setIsError(false)

    getAllTopics()
    .then((topicsList) => {
        setAllTopics(topicsList)
        setIsLoading(false)
    }).catch((error) => {
        console.error('Error fetching topics', error)
    })
}, [])

if (isLoading) {
    return <p>Loading topics</p>
}
if (isError) {
    return <p>Error loading topics</p>
}
return (
    <>
    <section > 
        <ul className="topics-list">
        {allTopics.map((topic) => {
            return (<li key={topic.slug}>
                <h3>{topic.slug}</h3>
                <p>{topic.description}</p>
                <img className="topic-img" src={topic.img_url} alt={topic.slug}/>
            </li>)
        })}
        </ul>
    </section>
    </>
)
}


export default Topics