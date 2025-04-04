import { useAppDispatch, useAppSelector } from "@hooks/app"
import { actGetUnits } from "@store/unit/unitSlice"
import { useEffect } from "react"
import Cookie from 'cookie-universal'
import { useNavigate, useParams } from "react-router-dom"
import './Unit.css';
import { Container } from "react-bootstrap"
import { actGetLessons } from "@store/lesson/lessonSlice"
import LessonsList from "@components/Lesson/LessonsList/LessonsList"
import { Button } from "@components/index";
import { setGameState } from "@store/quiz/quizSlice"
const Lesson = () => {
    const { idLevel, id, idUnit } = useParams()
    const unitIndx = parseInt(idUnit as string)
    const levelIndx = parseInt(idLevel as string)
    const { language } = useAppSelector(state => state.language)
    const { units } = useAppSelector(state => state.unit)
    const { lessons } = useAppSelector(state => state.lesson)
    const unitInfo = units?.data.find(unit => unit.id === unitIndx)
    const cookie = Cookie();
    const navigate = useNavigate()

    const dispatch = useAppDispatch()
    useEffect(() => {
        dispatch(actGetLessons(unitIndx))
        dispatch(actGetUnits(levelIndx))
    }, [])
    const showTest = () => {
        if (cookie.get('token')) {
            navigate(`quiz`)
        } else {
            navigate(`/login`)

        }
    }
    const goToTest = () => {
        dispatch(setGameState("playing"))
    }
    return (
        <div className="unitInfo">
            <Container>
                <div className="left">
                    <h2>
                        {language === 'French' ? 'Informations de unité' : "معلومات الوحدة"}

                    </h2>
                    <div className="text">
                        <h3>
                            - {language === 'French' ? unitInfo?.title : unitInfo?.title_ar}
                        </h3>

                        <p>
                            {language === 'French' ? unitInfo?.description : unitInfo?.description_ar}

                        </p>
                    </div>

                </div>

                <div className="right">
                    <h3>
                        {language === 'French' ? 'leçons' : "الدروس"}
                    </h3>
                    <LessonsList lessons={lessons!} />
                </div>
                <div onClick={showTest} className="btns">
                    <Button onclick={goToTest} >{
                        language === "French" ? "Test de unité"
                            : "اختبار الوحدة"}</Button>
                </div>
            </Container>
        </div>
    )
}

export default Lesson
