import { TLevel } from "@customtypes/levelType"
import './LevelsCard.css'
import Lock from '@assets/svgs/lock-svgrepo-com.svg?react'
import { useAppSelector } from "@hooks/app"
const LevelCard = (props: TLevel) => {
    const { language } = useAppSelector(state => state.language)
    return (
        <div className={props?.is_locked ? `levelCard` : `levelCard active`}>
            <div className="text">
                <h4>{props.num! + 1}. {language === "French" ? props.title : props.title_ar}</h4>
                <p>{language === "French" ? props.description_ar : props.description_ar}</p>
            </div>
            {props?.is_locked &&
                <div className="lock">
                    <Lock style={{ width: '30px', height: '30px' }} />
                </div>
            }
        </div>
    )
}

export default LevelCard
