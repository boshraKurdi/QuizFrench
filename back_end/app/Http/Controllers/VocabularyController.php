<?php

namespace App\Http\Controllers;

use App\Models\Vocabulary;
use App\Http\Requests\StoreVocabularyRequest;
use App\Http\Requests\UpdateVocabularyRequest;

class VocabularyController extends Controller
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
    public function store(StoreVocabularyRequest $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(Vocabulary $vocabulary)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateVocabularyRequest $request, Vocabulary $vocabulary)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Vocabulary $vocabulary)
    {
        //
    }
}
