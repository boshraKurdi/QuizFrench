import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import axiosErrorHandler from "@utils/axiosErrorHandler";
import { TCourse } from "@customtypes/courseType";
import Cookie from 'cookie-universal';
const cookie = Cookie()
type TResponse = TCourse;
const actShowCourse = createAsyncThunk(
    "course/actShowCourse",
    async (id: number, thunk) => {
        const { rejectWithValue } = thunk;
        try {
            const res = await axios.get<TResponse>(`/home/ShowCourse/${id}`,
                {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: 'Bearer ' + cookie.get('token')
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

export default actShowCourse;
