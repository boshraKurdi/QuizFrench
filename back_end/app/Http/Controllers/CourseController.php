<?php

namespace App\Http\Controllers;

use App\Models\Course;
use App\Http\Requests\StoreCourseRequest;
use App\Http\Requests\UpdateCourseRequest;
use App\Models\Lesson;
use App\Models\Target;
use App\Models\Unit;
use Illuminate\Support\Facades\DB;

class CourseController extends Controller
{
    /**
     * Display a listing of the resource.
     */

    public function quiz_level($id)
    {

        $quiz = Course::where('id', $id)->whereHas('quiz', function ($q) {
            $q->where('type', 'level');
        })
            ->with('quiz')
            ->get();

        return response()->json(['data' => $quiz]);
    }

    public function index()
    {
        $courses = Course::with('media')->get();
        return response()->json(['data' => $courses]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreCourseRequest $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function get_unit_course_level($id)
    {
        $courseId = DB::table('course_levels')
            ->join('courses', 'course_levels.course_id', '=', 'courses.id')
            ->where('course_levels.id', $id)
            ->value('courses.id');
        $check = Target::where('user_id', auth()->id())
            ->where('course_id', $courseId)
            ->where('type', 'unit')
            ->count();
        $userUnit = $check ? $check + 1 : 1;
        $units = Unit::where('course_level_id', $id)->get();
        if ($units) {
            foreach ($units as $index => $unit) {

                $unit->is_locked = ($index + 1) > $userUnit;
            }
        }
        return response()->json(['data' => $units]);
    }
    public function get_lesson($id)
    {
        $courseId = DB::table('lessons')
            ->join('units', 'lessons.unit_id', '=', 'units.id')
            ->join('course_levels', 'units.course_level_id', '=', 'course_levels.id')
            ->join('courses', 'course_levels.course_id', '=', 'courses.id')
            ->where('lessons.id', $id)
            ->value('courses.id');
        $check = Target::where('user_id', auth()->id())
            ->where('course_id', $courseId)
            ->where('type', 'lesson')
            ->count();
        $userLesson = $check ? $check + 1 : 1;
        $lessons = Lesson::where('unit_id', $id)->get();
        if ($lessons) {
            foreach ($lessons as $index => $lesson) {

                $lesson->is_locked = ($index + 1) > $userLesson;
            }
        }
        return response()->json(['data' => $lessons]);
    }
    public function show($id)
    {
        $course = Course::where('id', $id)->with(['levels', 'media', 'topics'])->first();
        $check = Target::where('user_id', auth()->id())
            ->where('course_id', $id)
            ->where('type', 'level')
            ->first();
        $userLevel = $check ? $check->level : 1;
        if ($course) {
            foreach ($course->levels as $index => $level) {

                $level->is_locked = ($index + 1) > $userLevel;
            }
        }
        return response()->json(['data' => $course]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateCourseRequest $request, Course $course)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Course $course)
    {
        //
    }
}
