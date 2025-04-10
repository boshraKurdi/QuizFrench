import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import axiosErrorHandler from "@utils/axiosErrorHandler";
import Cookie from 'cookie-universal';
import { TTopic } from "@customtypes/topicType";
type TResponse = TTopic[]
const cookie = Cookie()
const actDashGetTopics = createAsyncThunk(
    "dashboard/actDashGetTopics",
    async (id: number, thunk) => {
        const { rejectWithValue } = thunk;

        try {
            const res = await axios.get<TResponse>(`dashboard/topic/index/${id}`,
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

export default actDashGetTopics;
