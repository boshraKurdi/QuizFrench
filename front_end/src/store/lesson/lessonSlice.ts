import { createSlice } from "@reduxjs/toolkit";
import { TLoading } from "@customtypes/loadingType";
import { isString } from "@customtypes/isString";
import actGetLessons from "./act/actGetLessons";
import { TLesson } from "@customtypes/lessonType";
interface IAuthState {
    lessons: TLesson | null,
    loading: TLoading;
    error: string | null;
}
const initialState: IAuthState = {
    lessons: null,
    loading: "idle",
    error: null,
}
const authSlice = createSlice({
    name: 'lesson',
    initialState,
    reducers: {
        actCLearLessons: (state) => {
            state.lessons = null;
        },

    }
    ,
    extraReducers: (builder) => {
        //register
        builder.addCase(actGetLessons.pending, (state) => {
            state.loading = "pending";
            state.error = null;
        });
        builder.addCase(actGetLessons.fulfilled, (state, action) => {
            state.loading = "succeeded";
            state.lessons = action.payload;

        });
        builder.addCase(actGetLessons.rejected, (state, action) => {
            state.loading = "failed";
            if (isString(action.payload)) {
                state.error = action.payload;
            }
        });



    },
})

export {
    actGetLessons,
};
export const { actCLearLessons } = authSlice.actions;
export default authSlice.reducer