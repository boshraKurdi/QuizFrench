import UnitsList from "@components/Unit/UnitsList/UnitsList"
import { useAppDispatch, useAppSelector } from "@hooks/app"
import actShowCourse from "@store/course/act/actShowCourse"
import { actGetUnits } from "@store/unit/unitSlice"
import { useEffect } from "react"
import { useParams } from "react-router-dom"
import './Level.css';
import { Container } from "react-bootstrap"
const Level = () => {
    const { idLevel, id } = useParams()
    const levelIndx = parseInt(idLevel as string)
    const indx = parseInt(id as string)
    const { language } = useAppSelector(state => state.language)
    const { course } = useAppSelector(state => state.course)
    const { units } = useAppSelector(state => state.unit)
    const levelInfo = course?.data?.levels?.find((le) => le.id === levelIndx)
    console.log(levelInfo)
    console.log(levelIndx)
    const dispatch = useAppDispatch()
    useEffect(() => {
        dispatch(actShowCourse(indx))
        dispatch(actGetUnits(levelIndx))
    }, [])
    return (
        <div className="levelInfo">
            <Container>
                <div className="left">
                    <h2>
                        {language === 'French' ? 'Informations de niveau' : "معلومات المستوى"}
                    </h2>
                    <div className="text">
                        <h3>
                            - {language === 'French' ? levelInfo?.title : levelInfo?.title_ar}
                        </h3>

                        <p>
                            {language === 'French' ? levelInfo?.description : levelInfo?.description_ar}

                        </p>
                    </div>

                </div>

                <div className="right">
                    <h3>
                        {language === 'French' ? 'Unités' : "الوحدات"}
                    </h3>
                    <UnitsList units={units!} />
                </div>
            </Container>
        </div>
    )
}

export default Level
