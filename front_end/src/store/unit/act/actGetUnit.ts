import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import axiosErrorHandler from "@utils/axiosErrorHandler";
import { TUnit } from "@customtypes/unitType";

type TResponse = TUnit;
const actGetUnits = createAsyncThunk(
    "unit/actGetUnits",
    async (id: number, thunk) => {
        const { rejectWithValue } = thunk;

        try {
            const res = await axios.get<TResponse>(`/course/GetUnits/${id}`,
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

export default actGetUnits;
