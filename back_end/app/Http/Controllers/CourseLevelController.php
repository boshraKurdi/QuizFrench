<?php

namespace App\Http\Controllers;

use App\Models\CourseLevel;
use App\Http\Requests\StoreCourseLevelRequest;
use App\Http\Requests\UpdateCourseLevelRequest;

class CourseLevelController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreCourseLevelRequest $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(CourseLevel $courseLevel)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateCourseLevelRequest $request, CourseLevel $courseLevel)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(CourseLevel $courseLevel)
    {
        //
    }
}
