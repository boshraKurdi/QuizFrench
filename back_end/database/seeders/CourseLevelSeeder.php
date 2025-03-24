<?php

namespace Database\Seeders;

use App\Models\Course;
use App\Models\CourseLevel;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class CourseLevelSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        CourseLevel::factory(7)->create();
    }
}
