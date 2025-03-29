import LevelsList from "@components/Levels/LevelsList/LevelsList";
import TopicsList from "@components/Topics/TopicsList/TopicsList";
import { useAppDispatch, useAppSelector } from "@hooks/app";
import actShowCourse from "@store/course/act/actShowCourse";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom"
import './CourseInfo.css'
import { Container } from "react-bootstrap";
import Cookie from 'cookie-universal'
import HeadingTitle from "@components/common/HeadingTitle/HeadingTitle";
import { Button } from "@components/index";
import { setGameState } from "@store/quiz/quizSlice";
const CourseInfo = () => {
    const cookie = Cookie();
    const { id } = useParams();
    const { course } = useAppSelector(state => state.course)
    const { language } = useAppSelector(state => state.language)
    const indx = parseInt(id as string)
    const dispatch = useAppDispatch()
    useEffect(() => {
        dispatch(actShowCourse(indx))
    }, [])
    const navigate = useNavigate()
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
        <div className="showCourse">
            <Container className="cont">
                <div className="left">
                    <div className="image">
                        <img src={course?.data?.media[0].original_url} alt="" />
                    </div>
                    <div className="bottom">
                        <HeadingTitle>{language === "French" ? "Niveaux" : "المستويات"}</HeadingTitle>
                        <LevelsList levels={course?.data?.levels!} />
                    </div>
                </div>
                <div className="right">
                    <h2>{language === 'French' ? "Sujets:" : "المحاور:"}</h2>
                    <TopicsList topics={course?.data.topics!} />
                    {/* {!cookie.get('token') ?
                        <div className="btn">
                            <Button>{language === "French" ? "Test de niveau" : "اختبار تحديد المستوى"}</Button>
                        </div> : ""} */}
                    <div onClick={showTest} className="btns">
                        <Button onclick={goToTest}>{language === "French" ? "Test de niveau" : "اختبار تحديد المستوى"}</Button>
                    </div>
                </div>
            </Container>

        </div>
    )
}

export default CourseInfo
