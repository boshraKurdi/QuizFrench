<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Lesson extends Model
{
    /** @use HasFactory<\Database\Factories\LessonFactory> */
    use HasFactory;

    protected $fillable = [
        'title',
        'title_ar',
        'description_ar',
        'description',
        'unit_id'
    ];

    public function vocabulary()
    {
        return $this->hasMany(Vocabulary::class);
    }

    public function quiz()
    {
        return $this->hasMany(Quizlesson::class);
    }
}
