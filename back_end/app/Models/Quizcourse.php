<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Quizcourse extends Model
{
    /** @use HasFactory<\Database\Factories\QuizcourseFactory> */
    use HasFactory;

    protected $fillable = [
        'question',
        'answer_1',
        'answer_2',
        'answer_3',
        'answer_4',
        'answer_right',
        'type',
        'course_id'
    ];

    public function course()
    {
        return $this->belongsTo(Course::class);
    }
}
