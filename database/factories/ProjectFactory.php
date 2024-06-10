<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Project>
 */
class ProjectFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            //
            "name"=> fake()->sentence(4),
            "description"=> fake()->realText(),
            "due_date"=>fake()->dateTimeBetween("now","+1 year"),
            "image_path"=>fake()->imageUrl(),
            "status"=>fake()->randomElement(["pending","in_progress","completed"]),
            "created_by" => fake()->numberBetween(1,10),
            "updated_by"=>fake()->numberBetween(1,10),
            "created_at"=>time(),
            "updated_at"=>time(),


        ];
    }
}
