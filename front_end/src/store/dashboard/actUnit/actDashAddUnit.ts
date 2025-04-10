import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import axiosErrorHandler from "@utils/axiosErrorHandler";
import Cookie from 'cookie-universal';
import { TUnitProps } from "@customtypes/unitType";
type TResponse = TUnitProps
const cookie = Cookie()
const actDashAddUnit = createAsyncThunk(
    "dashboard/actDashAddUnit",
    async (form: TUnitProps, thunk) => {
        const { rejectWithValue } = thunk;

        try {
            const res = await axios.post<TResponse>(`dashboard/unit/store`, form
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

export default actDashAddUnit;
