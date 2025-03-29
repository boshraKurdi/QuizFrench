import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import axiosErrorHandler from "@utils/axiosErrorHandler";
import { TLesson } from "@customtypes/lessonType";
import Cookie from 'cookie-universal'

type TResponse = TLesson;
const cookie = Cookie()

const actGetLessons = createAsyncThunk(
    "lesson/actGetLessons",
    async (id: number, thunk) => {
        const { rejectWithValue, signal } = thunk;

        try {
            const res = await axios.get<TResponse>(`/course/GetLessons/${id}`,
                {
                    signal,
                    headers: {
                        // 'Content-Type': 'application/json'
                        Authorization: `Bearer ${cookie.get('token')}`

                    }
                },
            );
            console.log(res.data)
            return res.data;
        } catch (error) {
            console.log(error)
            return rejectWithValue(axiosErrorHandler(error));
        }
    }
);

export default actGetLessons;
