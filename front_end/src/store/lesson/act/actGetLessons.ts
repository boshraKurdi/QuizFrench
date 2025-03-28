import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import axiosErrorHandler from "@utils/axiosErrorHandler";
import { TLesson } from "@customtypes/lessonType";

type TResponse = TLesson;
const actGetLessons = createAsyncThunk(
    "lesson/actGetLessons",
    async (id: number, thunk) => {
        const { rejectWithValue } = thunk;

        try {
            const res = await axios.get<TResponse>(`/course/GetLessons/${id}`,
                {
                    headers: { 'Content-Type': 'application/json' },
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

export default actGetLessons;
