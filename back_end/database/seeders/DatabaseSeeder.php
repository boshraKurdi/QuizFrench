<?php

namespace Database\Seeders;

use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $this->call([
            UserSeeder::class,
            CourseSeeder::class,
            QuizcourseSeeder::class,
            LevelSeeder::class,
            CourseLevelSeeder::class,
            UnitSeeder::class,
            QuizunitSeeder::class,
            LessonSeeder::class,
            VocabularySeeder::class,
            QuizlessonSeeder::class,
            TargetSeeder::class,
            TopicSeeder::class,
            MediaSeeder::class
        ]);
    }
}
