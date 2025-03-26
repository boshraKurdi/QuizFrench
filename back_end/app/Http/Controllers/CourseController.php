<?php

namespace App\Http\Controllers;

use App\Models\Course;
use App\Http\Requests\StoreCourseRequest;
use App\Http\Requests\UpdateCourseRequest;

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
    public function show(Course $course)
    {
        return response()->json(['data' => $course->load(['levels', 'media', 'topics'])]);
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
