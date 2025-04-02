<?php

namespace App\Http\Controllers;

use App\Models\Quizlesson;
use App\Http\Requests\StoreQuizlessonRequest;
use App\Http\Requests\UpdateQuizlessonRequest;

class QuizlessonController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function quiz_lesson($id)
    {
        $quiz = Quizlesson::where('lesson_id', $id)->get();
        return response()->json(['data' => $quiz]);
    }
    public function index()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreQuizlessonRequest $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(Quizlesson $quizlesson)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateQuizlessonRequest $request, Quizlesson $quizlesson)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Quizlesson $quizlesson)
    {
        //
    }
}
