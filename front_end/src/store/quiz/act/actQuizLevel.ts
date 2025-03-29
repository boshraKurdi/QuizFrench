import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import axiosErrorHandler from "@utils/axiosErrorHandler";
import { TQuiz } from "@customtypes/QuizType";
import Cookie from 'cookie-universal'
type TResponse = TQuiz;
const cookie = Cookie()
const actQuizLevel = createAsyncThunk(
    "quiz/actQuizLevel",
    async (id: number, thunk) => {
        const { rejectWithValue, signal } = thunk;

        try {
            const res = await axios.get<TResponse>(`/course/QuizLevel/${id}`,
                {
                    signal,
                    headers: {
                        // 'Content-Type': 'application/json'
                        Authorization: `Bearer ${cookie.get('token')}`
                    },
                }
            );
            console.log(res.data)
            return res.data;
        } catch (error) {
            console.log(error)
            return rejectWithValue(axiosErrorHandler(error));
        }
    }
);

export default actQuizLevel;
