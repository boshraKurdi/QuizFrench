import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import axiosErrorHandler from "@utils/axiosErrorHandler";
import Cookie from 'cookie-universal';
import { TCourse } from "@customtypes/courseType";
type TResponse = TCourse
const cookie = Cookie()
const actDashAddCourses = createAsyncThunk(
    "dashboard/actDashAddCourses",
    async (formData: FormData, thunk) => {
        const { rejectWithValue } = thunk;

        try {
            const res = await axios.post<TResponse>(`dashboard/course/store`, formData
                , {
                    headers: {
                        'Content-Type': 'multipart/form-data',
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

export default actDashAddCourses;
