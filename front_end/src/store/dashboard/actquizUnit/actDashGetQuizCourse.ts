import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import axiosErrorHandler from "@utils/axiosErrorHandler";
import Cookie from 'cookie-universal';
import { TQuizUnit } from "@customtypes/QuizType";
type TResponse = TQuizUnit
const cookie = Cookie()
const actDashGetQuizUnit = createAsyncThunk(
    "dashboard/actDashGetQuizUnit",
    async (_, thunk) => {
        const { rejectWithValue } = thunk;

        try {
            const res = await axios.get<TResponse>(`dashboard/quiz_unit/index/`,
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

export default actDashGetQuizUnit;
