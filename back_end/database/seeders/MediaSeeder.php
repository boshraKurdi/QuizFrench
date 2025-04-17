<?php

namespace Database\Seeders;

use App\Models\Course;
use App\Models\Quizcourse;
use App\Models\Quizlesson;
use App\Models\Quizunit;
use App\Models\Vocabulary;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class MediaSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $audio = storage_path('audoi\pronunciation_fr_leçon.mp3');
        $audio_quiz = storage_path('audoi\quiz.mp3');
        $vocabularies = Vocabulary::all();
        $courses = Quizcourse::where('course_id', 5)->get();
        foreach ($courses as $course) {
            $quizcourse = Quizcourse::where('id', $course->id)->first();
            $quizcourse
                ->addMedia($audio_quiz)
                ->preservingOriginal()
                ->toMediaCollection('quizcourses');
        }
        $lessons = DB::table('quizlessons')
            ->join('lessons', 'lessons.id', '=', 'quizlessons.lesson_id')
            ->join('units', 'lessons.unit_id', '=', 'units.id')
            ->join('levels', 'units.level_id', '=', 'levels.id')
            ->join('courses', 'levels.course_id', '=', 'courses.id')
            ->where('courses.id', 5)
            ->pluck('quizlessons.id');
        foreach ($lessons as $lesson) {
            $quizlesson = Quizlesson::find($lesson);
            $quizlesson
                ->addMedia($audio_quiz)
                ->preservingOriginal()
                ->toMediaCollection('quizlessons');
        }
        $quizunits = DB::table('quizunits')
            ->join('units', 'units.id', '=', 'quizunits.unit_id')
            ->join('levels', 'units.level_id', '=', 'levels.id')
            ->join('courses', 'levels.course_id', '=', 'courses.id')
            ->where('levels.course_id', 5)
            ->pluck('quizunits.id');
        foreach ($quizunits as $quizunit) {
            $quizunit = Quizunit::find($quizunit);
            $quizunit
                ->addMedia($audio_quiz)
                ->preservingOriginal()
                ->toMediaCollection('quizunits');
        }
        foreach ($vocabularies as $vo) {
            $vocabular = Vocabulary::find($vo->id);
            $vocabular
                ->addMedia($audio)
                ->preservingOriginal()
                ->toMediaCollection('vocabularies');
        }
        $image_c_5 = storage_path('images\listen.webp');
        $image_c_4 = storage_path('images\read.webp');
        $image_c_2 = storage_path('images\system.webp');
        $image_c_1 = storage_path('images\sound.webp');
        $image_c_3 = storage_path('images\chat.webp');
        $course_1 = Course::find(1);
        $course_1
            ->addMedia($image_c_1)
            ->preservingOriginal()
            ->toMediaCollection('course');
        $course_2 = Course::find(2);
        $course_2
            ->addMedia($image_c_2)
            ->preservingOriginal()
            ->toMediaCollection('course');
        $course_3 = Course::find(3);
        $course_3
            ->addMedia($image_c_3)
            ->preservingOriginal()
            ->toMediaCollection('course');
        $course_4 = Course::find(4);
        $course_4
            ->addMedia($image_c_4)
            ->preservingOriginal()
            ->toMediaCollection('course');
        $course_5 = Course::find(5);
        $course_5
            ->addMedia($image_c_5)
            ->preservingOriginal()
            ->toMediaCollection('course');
    }
}
