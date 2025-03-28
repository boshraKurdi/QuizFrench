import { createSlice } from "@reduxjs/toolkit";
import { TLoading } from "@customtypes/loadingType";
import { isString } from "@customtypes/isString";
import actGetUnits from "./act/actGetUnit";
import { TUnit } from "@customtypes/unitType";
interface IAuthState {
    units: TUnit | null,
    loading: TLoading;
    error: string | null;
}
const initialState: IAuthState = {
    units: null,
    loading: "idle",
    error: null,
}
const authSlice = createSlice({
    name: 'unit',
    initialState,
    reducers: {
        actCLearUnit: (state) => {
            state.units = null;
        },

    }
    ,
    extraReducers: (builder) => {
        //register
        builder.addCase(actGetUnits.pending, (state) => {
            state.loading = "pending";
            state.error = null;
        });
        builder.addCase(actGetUnits.fulfilled, (state, action) => {
            state.loading = "succeeded";
            state.units = action.payload;

        });
        builder.addCase(actGetUnits.rejected, (state, action) => {
            state.loading = "failed";
            if (isString(action.payload)) {
                state.error = action.payload;
            }
        });



    },
})

export {
    actGetUnits,
};
export const { actCLearUnit } = authSlice.actions;
export default authSlice.reducer