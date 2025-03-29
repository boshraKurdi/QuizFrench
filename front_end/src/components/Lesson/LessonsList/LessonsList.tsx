import './LessonsList.css'
import { TUnit } from "@customtypes/unitType"
import UnitCard from "../LessonCard/LessonCard"
import { useAppSelector } from "@hooks/app"
const UnitsList = ({ units }: { units: TUnit }) => {
    const { language } = useAppSelector(state => state.language)
    const Cards = units?.data.map(to => <li key={to.id}><UnitCard {...to} /></li>)
    return (
        <ul className='topicsList'>
            {units?.data.length ? Cards : language === 'French' ? "Il n'y a pas encore de Unités" : "لم يتم اضافة المحاور بعد"}
        </ul>
    )
}

export default UnitsList
