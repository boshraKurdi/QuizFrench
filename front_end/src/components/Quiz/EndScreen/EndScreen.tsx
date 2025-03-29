// import { useContext } from "react";
// import { GameStateContext } from "../helpers/Contexts";
// import { Questions } from "../helpers/Questions";

import { useAppDispatch, useAppSelector } from "@hooks/app";
import { actQuizLevel, setGameState, setScore } from "@store/quiz/quizSlice";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import './EndScreen.css';
const EndScreen = () => {
    // const { score, setScore, setGameState, userName } = useContext(
    //     GameStateContext
    // );
    const { score, quizes } = useAppSelector(state => state.quiz)
    const { userData } = useAppSelector(state => state.auth)
    const { language } = useAppSelector(state => state.language)
    const dispatch = useAppDispatch()
    // const { score, setScore, gameState, setGameState } = useContext(
    //     GameStateContext
    // );
    const { id } = useParams();
    const indx = parseInt(id as string)
    useEffect(() => {
        dispatch(actQuizLevel(indx))
    }, [])

    const restartQuiz = () => {
        setScore(0);
        dispatch(setGameState("menu"));
    };
    return (
        <div className="EndScreen">
            <h1>Quiz Finished</h1>
            <h3>{userData?.user.name}</h3>
            <h1>
                {quizes?.data[0].quiz.length} / {score}
            </h1>
            <button onClick={restartQuiz}>{language === 'French' ? 'va à ton niveau' : 'اذهب الى مستواك'}</button>
        </div>
    );
};

export default EndScreen;
