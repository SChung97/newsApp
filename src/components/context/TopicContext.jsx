import { createContext, useState } from "react";
export const TopicContext = createContext()

export const TopicProvider = ({children}) =>
{
const [selectedTopic, setSelectedTopic] = useState(null)

const handleTopic = (slug) => {
    setSelectedTopic(previousTopic => previousTopic === slug ? null : slug)
}

return (
    <TopicContext.Provider value={{ selectedTopic, handleTopic}}>{children}</TopicContext.Provider>
)}