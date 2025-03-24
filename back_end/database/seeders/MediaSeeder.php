<?php

namespace Database\Seeders;

use App\Models\Course;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class MediaSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $image_c_2 = storage_path('images\listen.webp');
        $image_c_5 = storage_path('images\read.webp');
        $image_c_1 = storage_path('images\system.webp');
        $image_c_3 = storage_path('images\sound.webp');
        $image_c_4 = storage_path('images\chat.webp');
        $course_1 = Course::find(1);
        $course_1
            ->addMedia($image_c_1)
            ->preservingOriginal()
            ->toMediaCollection('course');
        $course_2 = Course::find(2);
        $course_2
            ->addMedia($image_c_2)
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
