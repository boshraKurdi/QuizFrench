import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import axiosErrorHandler from "@utils/axiosErrorHandler";
import Cookie from 'cookie-universal';
import { TLevel } from "@customtypes/levelType";
type TResponse = TLevel[]
const cookie = Cookie()
const actDashGetLevels = createAsyncThunk(
    "dashboard/actDashGetLevels",
    async (id: number, thunk) => {
        const { rejectWithValue } = thunk;

        try {
            const res = await axios.get<TResponse>(`dashboard/level/index/${id}`,
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

export default actDashGetLevels;
