import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import axiosErrorHandler from "@utils/axiosErrorHandler";
import { TCourses } from "@customtypes/coursesType";

type TResponse = TCourses
const actGetCourses = createAsyncThunk(
    "course/actGetCourses",
    async (_, thunk) => {
        const { rejectWithValue } = thunk;

        try {
            const res = await axios.get<TResponse>("home/GetCourses",
                {
                    headers: { 'Content-Type': 'application/json' },
                }
            );
            return res.data;
        } catch (error) {
            console.log(error)
            return rejectWithValue(axiosErrorHandler(error));
        }
    }
);

export default actGetCourses;
