<?php

namespace Database\Factories;

use App\Models\Lesson;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Quizlesson>
 */
class QuizlessonFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'question' => $this->faker->text,
            'answer_1' => $this->faker->text,
            'answer_2' => $this->faker->text,
            'answer_3' => $this->faker->text,
            'answer_4' => $this->faker->text,
            'answer_right' => $this->faker->text,
            'lesson_id' => Lesson::inRandomOrder()->first()->id,
        ];
    }
}
