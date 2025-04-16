import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import axiosErrorHandler from "@utils/axiosErrorHandler";
import Cookie from 'cookie-universal';
import { TTopic } from "@customtypes/topicType";
type TResponse = TTopic
const cookie = Cookie()
const actDashAddTopic = createAsyncThunk(
    "dashboard/actDashAddTopic",
    async (form: TTopic, thunk) => {
        const { rejectWithValue } = thunk;

        try {
            const res = await axios.post<TResponse>(`dashboard/topic/store`, form
                , {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${cookie.get('token')}`
                    },
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

export default actDashAddTopic;
