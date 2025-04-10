import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import axiosErrorHandler from "@utils/axiosErrorHandler";
import Cookie from 'cookie-universal';
import { TQuizProps } from "@customtypes/QuizType";
type TResponse = ""
const cookie = Cookie()
const actDashUpdateQuizCourse = createAsyncThunk(
    "dashboard/actDashUpdateQuizCourse",
    async (formData: TQuizProps, thunk) => {
        const { rejectWithValue } = thunk;

        try {
            const res = await axios.post<TResponse>(`dashboard/quiz_course/update/${formData.id}`, formData
                , {
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

export default actDashUpdateQuizCourse;
