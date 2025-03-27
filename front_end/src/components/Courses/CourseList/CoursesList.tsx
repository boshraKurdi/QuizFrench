import { useAppDispatch, useAppSelector } from "@hooks/app"
import CourseCard from "../CourseCard/CourseCard";
import { useEffect } from "react";
import { actGetCourses } from "@store/course/courseSlice";

const CoursesList = () => {
    const { courses } = useAppSelector(state => state.course);
    const dispatch = useAppDispatch()
    useEffect(() => {
        dispatch(actGetCourses())
    }, [])
    const CoursesCards = courses?.data.map((course) => <CourseCard key={course.id} {...course} />)
    return (
        <div className="CourseList">
            {CoursesCards}
        </div>
    )
}

export default CoursesList
