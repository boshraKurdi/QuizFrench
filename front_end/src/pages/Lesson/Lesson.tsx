import { Container, Table } from 'react-bootstrap'
import './Lesson.css'
import { useAppDispatch, useAppSelector } from '@hooks/app'
import { Fragment, useEffect } from 'react'
import { actGetLessons } from '@store/lesson/lessonSlice'
import { useNavigate, useParams } from 'react-router-dom'
import HeadingTitle from '@components/common/HeadingTitle/HeadingTitle'
import { Button } from '@components/index'
import Cookie from 'cookie-universal'
import { setGameState } from '@store/quiz/quizSlice'
const Lesson = () => {
    const { lessons } = useAppSelector(state => state.lesson)
    const { language } = useAppSelector(state => state.language)
    console.log(lessons)
    const { idUnit, idLesson } = useParams()
    const unitIndx = parseInt(idUnit as string)
    const lessonIndx = parseInt(idLesson as string)
    const dispatch = useAppDispatch()
    const lessonInfo = lessons?.data.find(le => le.id === lessonIndx)
    useEffect(() => {
        dispatch(actGetLessons(unitIndx))
    }, [])
    const vocalList = lessonInfo?.vocabulary.map(vo => <Fragment key={vo.id}>
        <tr >
            <td >
                <h5>{vo.word}</h5>
            </td>
            <td >
                <h5>{vo.translation}</h5>
            </td>
            <td>
                <Button > <a href={vo.audio_url!}>{language === 'French' ? "écoute " : "استمع "}</a></Button>
            </td>
        </tr>
        <tr>
            <td colSpan={3}>
                <h5>{vo.example_sentence}</h5>
            </td>
        </tr></Fragment>

    )
    const cookie = Cookie()
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
        <div className='showLesson'>
            <Container>
                <HeadingTitle>{language === 'French' ? lessonInfo?.title : lessonInfo?.title_ar}</HeadingTitle>
                <h4>{language === 'French' ? lessonInfo?.objective : lessonInfo?.objective_ar}</h4>
                <p>{language === 'French' ? lessonInfo?.content : lessonInfo?.content_ar}</p>
                <a href={lessonInfo?.video_url!}>{language === 'French' ? "regarder le cours" : "شاهد الدرس"}</a>
                <hr />
                <h3>{language === 'French' ? "Vocabulaires" : "المفردات"}</h3>
                <Table striped bordered hover size="sm">
                    <thead>
                        <tr>
                            <th>
                                {language === 'French' ? "en français" : "في الفرنسية"}
                            </th>
                            <th>
                                {language === 'French' ? "en arabe" : "في العربية"}

                            </th>
                            <th>
                                {language === 'French' ? "écoute le mot" : "استمع للكلمة"}

                            </th>

                        </tr>
                    </thead>
                    <tbody>
                        {vocalList}
                    </tbody>
                </Table>
                {/* <table border={2}>
                    <tr>
                        <th>
                            {language === 'French' ? "en français" : "في الفرنسية"}
                        </th>
                        <th>
                            {language === 'French' ? "en arabe" : "في العربية"}

                        </th>
                        <th>
                            {language === 'French' ? "écoute le mot" : "استمع للكلمة"}

                        </th>

                    </tr>
                    <tr>
                        {vocalList}

                    </tr>

                </table> */}
                <div onClick={showTest} className="btns">
                    <Button onclick={goToTest} >{
                        language === "French" ? "Test de leçon"
                            : "اختبار الدرس"}</Button>
                </div>
            </Container >
        </div>
    )
}

export default Lesson
