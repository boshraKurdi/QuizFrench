import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import axiosErrorHandler from "@utils/axiosErrorHandler";
import { TQuizUnit } from "@customtypes/QuizType";
import Cookie from 'cookie-universal'
type TResponse = TQuizUnit;
const cookie = Cookie()
const actGetQuizUnit = createAsyncThunk(
    "unit/actGetQuizUnit",
    async (id: number, thunk) => {
        const { rejectWithValue, signal } = thunk;

        try {
            const res = await axios.get<TResponse>(`unit/QuizUnit/${id}`,
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

export default actGetQuizUnit;
