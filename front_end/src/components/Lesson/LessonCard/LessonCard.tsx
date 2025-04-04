import './LessonCard.css'
import Lock from '@assets/svgs/lock-svgrepo-com.svg?react'
import { useAppSelector } from "@hooks/app"
import { TLessonProps } from '@customtypes/lessonType'
import { useNavigate, useParams } from 'react-router-dom'
const UnitCard = (props: TLessonProps) => {
    const { language } = useAppSelector(state => state.language)
    const navigate = useNavigate()
    const { id, idLevel, idUnit } = useParams()
    return (
        <div
            onClick={() => navigate(`/courses/${id}/levels/${idLevel}/units/${idUnit}/lessons/${props.id}`)}
            className={props?.is_locked ? `lessonCard` : `lessonCard active`}>
            <div className="text">
                <h4> {language === "French" ? props.title : props.title_ar}</h4>
                <p>{language === "French" ? props.objective : props.objective_ar}</p>
            </div>
            {props?.is_locked &&
                <div className="lock">
                    <Lock style={{ width: '30px', height: '30px' }} />
                </div>
            }
        </div>
    )
}

export default UnitCard
