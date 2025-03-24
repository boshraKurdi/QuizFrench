<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Quizunit extends Model
{
    /** @use HasFactory<\Database\Factories\QuizunitFactory> */
    use HasFactory;

    protected $fillable = [
        'question ',
        'answer_1',
        'answer_2',
        'answer_3',
        'answer_4',
        'answer_right',
        'unit_id'
    ];

    public function unit()
    {
        return $this->belongsTo(Unit::class);
    }
}
