import { useParams, Link } from "react-router-dom"
import { TopicContext } from "./context/TopicContext"
import { getAllArticles } from "../api"
import '../App.css'
import { useContext, useEffect, useState } from "react"

function FilteredTopics() {
    const {topic_slug} = useParams()
    const {selectedTopic, handleTopic} = useContext(TopicContext)

    const [allArticles, setAllArticles] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [isError, setIsError] = useState(null)

    console.log('rendering FilteredTopics page')

    useEffect(() => {
        console.log('filtered articles useEffect fired')
        setIsLoading(true)
        setIsError(null)
        setAllArticles([])

        getAllArticles(topic_slug)
        .then((articlesList) => {
            setAllArticles(articlesList)
            setIsLoading(false)
        })
        .catch((error) => {
            console.error('Error fetching articles', error);
            setIsLoading(false)
            if (error.response && error.response.status === 404) {
                setIsError('This topic does not exist!')
            } else {
                setIsError(`Failed to load articles for ${topic_slug}`)
            }
        })
    }, [topic_slug])

    useEffect(() => {
        if (topic_slug && topic_slug !== selectedTopic) {
            handleTopic(topic_slug)
        } else if (!topic_slug && selectedTopic) {
            handleTopic(null)
        }
    }, [topic_slug, selectedTopic, handleTopic])

    const filteredArticles = allArticles.filter(article => article.topic === topic_slug)

    if (isLoading) {
        return <p>Loading articles for {topic_slug}</p>
    }
    if (isError) {
        return <p>{isError}</p>
    }

    if (filteredArticles.length === 0) {
        return <p>This topic doesn't exist!</p>
    }
    return (
        <>
        <section>
            <h2>Articles about {topic_slug}</h2>
            <ul className='articles-list'>
                {filteredArticles.map((article) => {
                    return (
                        <li key={article.article_id}className='article-list-item'>
                            <Link to={`articles/${article.article_id}`} className='article-title-link'>
                            <h3>{article.title}</h3>
                            </Link>

                            <p>{article.author}</p>
                <img
                  className="article_img"
                  src={article.article_img_url}
                  alt={article.title}
                />

<p>Comment count: {article.comment_count}</p>
                <p>Votes: {article.votes}</p>
                <p>{new Date(article.created_at).toLocaleDateString()}</p>
                        </li>
                    )
                })}
            </ul>
        </section>
        </>
    )
}


export default FilteredTopics