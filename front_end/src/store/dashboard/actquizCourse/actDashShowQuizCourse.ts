import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import axiosErrorHandler from "@utils/axiosErrorHandler";
import Cookie from 'cookie-universal';
const cookie = Cookie()
const actDashShowQuizCourse = createAsyncThunk(
    "dashboard/actDashShowQuizCourse",
    async (id: number, thunk) => {
        const { rejectWithValue } = thunk;

        try {
            const res = await axios.get(`dashboard/quiz_course/show/${id}`,
                {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${cookie.get('token')}`
                    },
                }
            );
            return res.data.data;
        } catch (error) {
            console.log(error)
            return rejectWithValue(axiosErrorHandler(error));
        }
    }
);

export default actDashShowQuizCourse;
