// import { useContext } from "react";
// import { GameStateContext } from "../helpers/Contexts";
// import { Questions } from "../helpers/Questions";
import { toast } from "react-hot-toast";

import { useAppDispatch, useAppSelector } from "@hooks/app";
import { actAddProgress, actQuizLevel, setGameState, setScore } from "@store/quiz/quizSlice";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import './EndScreen.css';
const EndScreen = () => {

    const { score, quizes, result } = useAppSelector(state => state.quiz)
    const { userData } = useAppSelector(state => state.auth)
    const { language } = useAppSelector(state => state.language)
    const dispatch = useAppDispatch()

    const { id } = useParams();
    const indx = parseInt(id as string)
    const data = {
        course_id: indx,
        degree: score,
        type: 'level'
    }
    const navigate = useNavigate()
    useEffect(() => {

        dispatch(actAddProgress(data)).unwrap()
            .then((res) => {
                if (score > 5)
                    toast.success(res?.message!);
                else
                    toast.error(res?.message!);
            })
        dispatch(actQuizLevel(indx))

    }, [])
    useEffect(() => {

    }, [])
    const goToLevel = () => {
        navigate(`/courses/${indx}/level/${result?.data.level_id}`)
    }
    // const restartQuiz = () => {
    //     setScore(0);
    //     dispatch(setGameState("menu"));
    // };
    return (
        <div className="EndScreen">

            <h1>{language === 'French' ? 'Quiz terminé' : "انتهى الاختبار"}</h1>
            <h3>{userData?.user.name}</h3>
            <h3>{result?.data.status}</h3>
            <h3>{language === 'French' ? 'ton niveau est ' : "مستواك هو "}{result?.data.level}</h3>
            <h3>
                {language === 'French' ? 'votre résultat: ' : 'نتيجتك:'}
                {score + "/" + quizes?.data[0].quiz.length!}

            </h3>
            <button onClick={goToLevel}>{language === 'French' ? 'va à ton niveau' : 'اذهب الى مستواك'}</button>
        </div>
    );
};

export default EndScreen;
