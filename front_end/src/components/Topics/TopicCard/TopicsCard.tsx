import { TLevel } from "@customtypes/levelType"
import './TopicsCard.css'
import { useAppSelector } from "@hooks/app"
const TopicsCard = (props: TLevel) => {
    const { language } = useAppSelector(state => state.language)
    return (
        <div className="topicsCard">
            <h4>{language === "French" ? props.title : props.title_ar}</h4>
            <p>{language === "French" ? props.description : props.description_ar}</p>
        </div>
    )
}

export default TopicsCard
