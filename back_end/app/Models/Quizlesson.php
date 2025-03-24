<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Quizlesson extends Model
{
    /** @use HasFactory<\Database\Factories\QuizlessonFactory> */
    use HasFactory;
    protected $fillable = [
        'question ',
        'answer_1',
        'answer_2',
        'answer_3',
        'answer_4',
        'answer_right',
        'lesson_id'
    ];

    public function lesson()
    {
        return $this->belongsTo(Lesson::class);
    }
}
