import './LessonsList.css'
import LessonCard from "../LessonCard/LessonCard"
import { useAppSelector } from "@hooks/app"
import { TLesson } from '@customtypes/lessonType'
const LessonsList = ({ lessons }: { lessons: TLesson }) => {
    const { language } = useAppSelector(state => state.language)
    const Cards = lessons?.data.map(le => <li key={le.id}><LessonCard {...le} /></li>)
    return (
        <ul className='topicsList'>
            {lessons?.data.length ? Cards : language === 'French' ? "Il n'y a pas encore de leçons" : "لم يتم اضافة المحاور بعد"}
        </ul>
    )
}

export default LessonsList
