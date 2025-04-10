import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import axiosErrorHandler from "@utils/axiosErrorHandler";
import { TCourses } from "@customtypes/coursesType";
import Cookie from 'cookie-universal';
type TResponse = TCourses
const cookie = Cookie()
const actDashGetCourses = createAsyncThunk(
    "dashboard/actDashGetCourses",
    async (_, thunk) => {
        const { rejectWithValue } = thunk;

        try {
            const res = await axios.get<TResponse>("dashboard/course/index",
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

export default actDashGetCourses;
