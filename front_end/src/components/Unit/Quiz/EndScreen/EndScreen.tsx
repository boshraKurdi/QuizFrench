// import { useContext } from "react";
// import { GameStateContext } from "../helpers/Contexts";
// import { Questions } from "../helpers/Questions";
import { toast } from "react-hot-toast";

import { useAppDispatch, useAppSelector } from "@hooks/app";
import { actAddProgress, setGameState, setScore } from "@store/quiz/quizSlice";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import './EndScreen.css';
import actGetQuizUnit from "@store/unit/act/actGetQuizUnit";
const EndScreen = () => {

    const { score, result } = useAppSelector(state => state.quiz)
    const { quizes } = useAppSelector(state => state.unit)
    const { userData } = useAppSelector(state => state.auth)
    const { language } = useAppSelector(state => state.language)
    const dispatch = useAppDispatch()

    const { id, idUnit } = useParams();
    const indx = parseInt(id as string)
    const unitIndx = parseInt(idUnit as string)
    const data = {
        course_id: indx,
        degree: score,
        type: 'unit'
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
        dispatch(actGetQuizUnit(unitIndx))

    }, [])
    useEffect(() => {

    }, [])
    const goToLevel = () => {
        // navigate(`/courses/${indx}/unit/${result?.data.level_id}`)
        navigate(-1)
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
            {/* <h3>{language === 'French' ? 'ton niveau est ' : "مستواك هو "}{result?.data.level}</h3> */}
            <h3>
                {language === 'French' ? 'votre résultat: ' : 'نتيجتك:'}
                {score + "/" + quizes?.data.length!}

            </h3>
            <button onClick={goToLevel}>{language === 'French' ? 'retour aux unités ' : 'العودة الى الوحدات'}</button>
        </div>
    );
};

export default EndScreen;
