<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Level extends Model
{
    /** @use HasFactory<\Database\Factories\LevelFactory> */
    use HasFactory;

    protected $fillable = [
        'number',
        'title',
        'title_ar',
        'description_ar',
        'description'
    ];

    public function course()
    {
        return $this->belongsTo(Course::class);
    }
}
