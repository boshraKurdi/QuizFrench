import { createSlice } from "@reduxjs/toolkit";
import { TLoading } from "@customtypes/loadingType";
import { isString } from "@customtypes/isString";
import { TCourses } from "@customtypes/coursesType";
import { TCourse } from "@customtypes/courseType";
import actGetCourses from "./act/actGetCourses";
import actShowCourse from "./act/actShowCourse";
// import actUpdateProfile from "./act/actUpdateProfile";
interface IAuthState {
    courses: TCourses | null,
    course: TCourse | null,
    loading: TLoading;
    error: string | null;
}
const initialState: IAuthState = {
    courses: null,
    course: null,
    loading: "idle",
    error: null,
}
const authSlice = createSlice({
    name: 'course',
    initialState,
    reducers: {
        actCLearCourse: (state) => {
            state.courses = null;
        },
        actCLearCourses: (state) => {
            state.course = null;
        },
    }
    ,
    extraReducers: (builder) => {
        //register
        builder.addCase(actGetCourses.pending, (state) => {
            state.loading = "pending";
            state.error = null;
        });
        builder.addCase(actGetCourses.fulfilled, (state, action) => {
            state.loading = "succeeded";
            state.courses = action.payload;

        });
        builder.addCase(actGetCourses.rejected, (state, action) => {
            state.loading = "failed";
            if (isString(action.payload)) {
                state.error = action.payload;
            }
        });


        // login
        builder.addCase(actShowCourse.pending, (state) => {
            state.loading = "pending";
            state.error = null;
        });
        builder.addCase(actShowCourse.fulfilled, (state, action) => {
            state.loading = "succeeded";
            state.course = action.payload;
        });
        builder.addCase(actShowCourse.rejected, (state, action) => {
            state.loading = "failed";
            if (isString(action.payload)) {
                state.error = action.payload;
            }
        });



    },
})

export {
    actGetCourses,
};
export const { actCLearCourse } = authSlice.actions;
export default authSlice.reducer