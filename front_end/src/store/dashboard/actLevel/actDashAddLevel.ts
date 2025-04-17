import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import axiosErrorHandler from "@utils/axiosErrorHandler";
import Cookie from 'cookie-universal';
import { TLevel } from "@customtypes/levelType";
type TResponse = TLevel
const cookie = Cookie()
const actDashAddLevel = createAsyncThunk(
    "dashboard/actDashAddLevel",
    async (form: TLevel, thunk) => {
        const { rejectWithValue } = thunk;

        try {
            const res = await axios.post<TResponse>(`dashboard/level/store`, form
                , {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${cookie.get('token')}`
                    },
                }
            );
            return form;
        } catch (error) {
            console.log(error)
            return rejectWithValue(axiosErrorHandler(error));
        }
    }
);

export default actDashAddLevel;
