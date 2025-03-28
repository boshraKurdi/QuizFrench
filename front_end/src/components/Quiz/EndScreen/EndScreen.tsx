// import { useContext } from "react";
// import { GameStateContext } from "../helpers/Contexts";
// import { Questions } from "../helpers/Questions";

import { useAppDispatch, useAppSelector } from "@hooks/app";
import { actQuizLevel, setGameState, setScore } from "@store/quiz/quizSlice";
import { useEffect } from "react";
import { useParams } from "react-router-dom";

const EndScreen = () => {
    // const { score, setScore, setGameState, userName } = useContext(
    //     GameStateContext
    // );
    const { score, quizes } = useAppSelector(state => state.quiz)
    const { userData } = useAppSelector(state => state.auth)
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
        setGameState("menu");
    };
    return (
        <div className="EndScreen">
            <h1>Quiz Finished</h1>
            <h3>{userData?.user.name}</h3>
            <h1>
                {score} / {quizes?.data[0].quiz.length}
            </h1>
            <button onClick={restartQuiz}>Restart Quiz</button>
        </div>
    );
};

export default EndScreen;
