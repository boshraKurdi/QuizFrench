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
            ->with('quiz.media')
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
        $store = Course::create([
            'title' => $request->title,
            'title_ar' => $request->title_ar,
            'description_ar' => $request->description_ar,
            'description' => $request->description
        ]);
        if ($request->media) {
            $store->addMediaFromRequest('media')->toMediaCollection('courses');
        }
        return response()->json(['data' => $store, 'message' => 'add course successfully!']);
    }

    /**
     * Display the specified resource.
     */
    public function get_unit_course_level($id)
    {
        $level = DB::table('levels')
            ->where('levels.id', $id)
            ->first();
        $courseId = DB::table('levels')
            ->join('courses', 'levels.course_id', '=', 'courses.id')
            ->where('levels.id', $id)
            ->value('courses.id');
        $check = Target::where('user_id', auth()->id())
            ->where('course_id', $courseId)
            ->where('type', 'unit')
            ->count();
        $check_level = Target::where('user_id', auth()->id())
            ->where('course_id', $courseId)
            ->where('type', 'level')
            ->first();
        $check_level_number =  $check_level ? $check_level->level : 0;
        $userUnit = $check ? $check + 1 : 1;
        $units = Unit::where('level_id', $id)->get();
        if ($units) {
            foreach ($units as $index => $unit) {
                if ($check_level_number > $level->number) {
                    $unit->is_locked = false;
                } else {
                    $unit->is_locked = ($index + 1) > $userUnit;
                }
            }
        }
        return response()->json(['data' => $units]);
    }
    public function get_lesson($id)
    {
        $level = DB::table('levels')
            ->where('levels.id', $id)
            ->first();
        $unit = DB::table('units')
            ->where('level_id', $id)
            ->first();
        $courseId = DB::table('lessons')
            ->join('units', 'lessons.unit_id', '=', 'units.id')
            ->join('levels', 'units.level_id', '=', 'levels.id')
            ->join('courses', 'levels.course_id', '=', 'courses.id')
            ->where('lessons.id', $id)
            ->value('courses.id');
        $check = Target::where('user_id', auth()->id())
            ->where('course_id', $courseId)
            ->where('type', 'lesson')
            ->count();
        $check_level = Target::where('user_id', auth()->id())
            ->where('course_id', $courseId)
            ->where('type', 'level')
            ->first();
        $check_unit = Target::where('user_id', auth()->id())
            ->where('course_id', $courseId)
            ->where('type', 'unit')
            ->count();
        $check_level_number =  $check_level ? $check_level->level : 0;
        $userLesson = $check ? $check + 1 : 1;
        $lessons = Lesson::where('unit_id', $id)->with(['vocabulary', 'vocabulary.media'])->get();
        if ($lessons) {
            foreach ($lessons as $index => $lesson) {
                if ($check_level_number > $level->number || $check_unit >= $unit->number) {
                    $lesson->is_locked = false;
                } else {
                    $lesson->is_locked = ($index + 1) > $userLesson;
                }
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
        $buttonLevelQuiz  = $check ? false : true;
        $course->buttonLevelQuiz = $buttonLevelQuiz;
        if ($course) {
            foreach ($course->levels as $index => $level) {

                $level->is_locked = ($index + 1) > $userLevel;
            }
        }
        return response()->json(['data' => $course]);
    }
    public function showCourse(Course $course)
    {
        return response()->json(['data' => $course->load(['media'])]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateCourseRequest $request, Course $course)
    {
        $course->update([
            'title' => $request->title,
            'title_ar' => $request->title_ar,
            'description_ar' => $request->description_ar,
            'description' => $request->description
        ]);
        if ($request->media) {
            $course->addMediaFromRequest('media')->toMediaCollection('courses');
        }
        return response()->json(['data' => $course, 'message' => 'update course successfully!']);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Course $course)
    {
        $course->delete();
        return response()->json(['message' => 'delete course successfully!']);
    }
}
