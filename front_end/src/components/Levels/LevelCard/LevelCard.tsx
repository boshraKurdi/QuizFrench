import { TLevel } from "@customtypes/levelType"
import './LevelsCard.css'
import { useAppSelector } from "@hooks/app"
const LevelCard = (props: TLevel) => {
    const { language } = useAppSelector(state => state.language)
    return (
        <div className="levelCard">
            <h4>{language === "French" ? props.title : props.title_ar}</h4>
            <p>{language === "French" ? props.description_ar : props.description_ar}</p>
        </div>
    )
}

export default LevelCard
