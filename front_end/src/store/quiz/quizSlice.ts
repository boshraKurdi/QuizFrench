import { createSlice } from "@reduxjs/toolkit";
import { TLoading } from "@customtypes/loadingType";
import { isString } from "@customtypes/isString";
import actQuizLevel from "./act/actQuizLevel";
import { TQuiz } from "@customtypes/QuizType";
interface IAuthState {
    quizes: TQuiz | null,
    gameState: string,
    score: number,
    loading: TLoading;
    error: string | null;
}
const initialState: IAuthState = {
    quizes: null,
    gameState: '',
    score: 0,
    loading: "idle",
    error: null,
}
const authSlice = createSlice({
    name: 'quiz',
    initialState,
    reducers: {
        actCLearQuiz: (state) => {
            state.quizes = null;
        },
        setGameState: (state, action) => {
            state.gameState = action.payload
        },
        setScore: (state, action) => {
            state.score = action.payload
        }
    }
    ,
    extraReducers: (builder) => {
        //register
        builder.addCase(actQuizLevel.pending, (state) => {
            state.loading = "pending";
            state.error = null;
        });
        builder.addCase(actQuizLevel.fulfilled, (state, action) => {
            state.loading = "succeeded";
            state.quizes = action.payload;

        });
        builder.addCase(actQuizLevel.rejected, (state, action) => {
            state.loading = "failed";
            if (isString(action.payload)) {
                state.error = action.payload;
            }
        });



    },
})

export {
    actQuizLevel,
};
export const { actCLearQuiz, setGameState, setScore } = authSlice.actions;
export default authSlice.reducer