import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import axiosErrorHandler from "@utils/axiosErrorHandler";
import Cookie from 'cookie-universal';
type TResponse = ""
const cookie = Cookie()
const actDashUpdateCourse = createAsyncThunk(
    "dashboard/actDashUpdateCourse",
    async (formData: FormData, thunk) => {
        const { rejectWithValue } = thunk;

        try {
            const res = await axios.post<TResponse>(`dashboard/course/update/${formData.get('id')}`, formData
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

export default actDashUpdateCourse;
