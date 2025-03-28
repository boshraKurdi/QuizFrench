import "./Quiz.css";
// import { Questions } from "../helpers/Questions";
import { useEffect, useState } from "react";

// import { useContext } from "react";
// import { GameStateContext } from "../helpers/Contexts";
import { useAppDispatch, useAppSelector } from "@hooks/app";
import { actQuizLevel, setGameState, setScore } from "@store/quiz/quizSlice";
import { useParams } from "react-router-dom";
import './Quiz.css'
function Quiz() {
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [optionChosen, setOptionChosen] = useState("");
    const { score, quizes } = useAppSelector(state => state.quiz)
    const dispatch = useAppDispatch()
    // const { score, setScore, gameState, setGameState } = useContext(
    //     GameStateContext
    // );
    const { id } = useParams();
    const indx = parseInt(id as string)
    useEffect(() => {
        dispatch(actQuizLevel(indx))
    }, [])

    const chooseOption = (option: string) => {
        setOptionChosen(option);
    };

    const nextQuestion = () => {
        // if (Questions[currentQuestion].asnwer == optionChosen) {
        //     setScore(score + 1);
        // }
        if (quizes?.data[0].quiz[currentQuestion].answer_right == optionChosen) {
            dispatch(setScore(score + 1));

        }
        setCurrentQuestion(currentQuestion + 1);
    };

    const finishQuiz = () => {
        // if (Questions[currentQuestion].asnwer == optionChosen) {
        //     dispatch(setScore(score + 1));
        // }
        if (quizes?.data[0].quiz[currentQuestion].answer_right == optionChosen) {
            dispatch(setScore(score + 1));

        }
        setGameState("finished");
    };
    return (
        <div className="Quiz">
            <h1>{quizes?.data[0].quiz[currentQuestion].question}</h1>
            <div className="questions">
                <button
                    onClick={() => {
                        // chooseOption("optionA");
                        chooseOption(quizes?.data[0].quiz[currentQuestion].answer_1!)
                    }}
                >
                    {quizes?.data[0].quiz[currentQuestion].answer_1}
                </button>
                <button
                    onClick={() => {
                        // chooseOption("optionB");
                        chooseOption(quizes?.data[0].quiz[currentQuestion].answer_2!)

                    }}
                >
                    {/* {Questions[currentQuestion].optionB} */}
                    {quizes?.data[0].quiz[currentQuestion].answer_2}

                </button>
                <button
                    onClick={() => {
                        // chooseOption("optionC");
                        chooseOption(quizes?.data[0].quiz[currentQuestion].answer_3!)

                    }}
                >
                    {quizes?.data[0].quiz[currentQuestion].answer_3}

                    {/* {Questions[currentQuestion].optionC} */}
                </button>
                <button
                    onClick={() => {
                        // chooseOption("optionD");
                        chooseOption(quizes?.data[0].quiz[currentQuestion].answer_4!)

                    }}
                >
                    {/* {Questions[currentQuestion].optionD} */}
                    {quizes?.data[0].quiz[currentQuestion].answer_4}

                </button>
            </div>

            {currentQuestion == quizes?.data[0].quiz.length! - 1 ? (
                <button onClick={finishQuiz} id="nextQuestion">
                    Finish Quiz
                </button>
            ) : (
                <button onClick={nextQuestion} id="nextQuestion">
                    Next Question
                </button>
            )}
        </div>
    );
}

export default Quiz;
