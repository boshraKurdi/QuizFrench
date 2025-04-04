import './UnitCard.css'
import Lock from '@assets/svgs/lock-svgrepo-com.svg?react'
import { useAppSelector } from "@hooks/app"
import { TUnitProps } from "@customtypes/unitType"
import { useNavigate, useParams } from 'react-router-dom'
const UnitCard = (props: TUnitProps) => {
    const { language } = useAppSelector(state => state.language)
    const { id, idLevel, } = useParams()
    const navigate = useNavigate()
    const indx = parseInt(id as string)
    return (
        <div onClick={() =>
            navigate(`/courses/${indx}/levels/${idLevel}/units/${props.id}`)}
            className={props?.is_locked ? `unitCard` : `unitCard active`}>
            <div className="text">
                <h4> {language === "French" ? props.title : props.title_ar}</h4>
                <p>{language === "French" ? props.description : props.description_ar}</p>
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
