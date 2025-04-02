<?php

namespace App\Http\Controllers;

use App\Models\Quizunit;
use App\Http\Requests\StoreQuizunitRequest;
use App\Http\Requests\UpdateQuizunitRequest;

class QuizunitController extends Controller
{
    /**
     * Display a listing of the resource.
     */

    public function quiz_unit($id)
    {
        $quiz = Quizunit::where('unit_id', $id)->get();
        return response()->json(['data' => $quiz]);
    }
    public function index()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreQuizunitRequest $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(Quizunit $quizunit)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateQuizunitRequest $request, Quizunit $quizunit)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Quizunit $quizunit)
    {
        //
    }
}
