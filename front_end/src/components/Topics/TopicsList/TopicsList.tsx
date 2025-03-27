import { TLevel } from "@customtypes/levelType"
import TopicsCard from "../TopicCard/TopicsCard"
import { useAppSelector } from "@hooks/app"
import './TopicsList.css'
const TopicsList = ({ topics }: { topics: TLevel[] }) => {
    const { language } = useAppSelector(state => state.language)
    const Cards = topics?.map(to => <li><TopicsCard key={to.id}{...to} /></li>)
    return (
        <ul className='topicsList'>
            {topics?.length ? Cards : language === 'French' ? "Il n'y a pas encore de sujets" : "لم يتم اضافة المحاور بعد"}
        </ul>
    )
}

export default TopicsList
