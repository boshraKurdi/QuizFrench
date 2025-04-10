import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import axiosErrorHandler from "@utils/axiosErrorHandler";
import Cookie from 'cookie-universal';
import { TQuizProps } from "@customtypes/QuizType";
type TResponse = TQuizProps
const cookie = Cookie()
const actDashShowQuizLesson = createAsyncThunk(
    "dashboard/actDashShowQuizLesson",
    async (id: number, thunk) => {
        const { rejectWithValue } = thunk;

        try {
            const res = await axios.get<TResponse>(`dashboard/quiz_lesson/show/${id}`,
                {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${cookie.get('token')}`
                    },
                }
            );
            return res.data;
        } catch (error) {
            console.log(error)
            return rejectWithValue(axiosErrorHandler(error));
        }
    }
);

export default actDashShowQuizLesson;
