import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import axiosErrorHandler from "@utils/axiosErrorHandler";
import Cookie from 'cookie-universal';
const cookie = Cookie()
const actDashGetCourses = createAsyncThunk(
    "dashboard/actDashGetCourses",
    async (_, thunk) => {
        const { rejectWithValue } = thunk;

        try {
            const res = await axios.get("dashboard/course/index",
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

export default actDashGetCourses;
