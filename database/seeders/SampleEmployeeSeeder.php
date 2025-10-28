<?php

namespace Database\Seeders;

use App\Models\Employee;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Faker\Factory as Faker;
use Illuminate\Support\Facades\DB;

class SampleEmployeeSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $faker = Faker::create();

        // Optional: Clear table before seeding
        DB::table('employees')->truncate();

        for ($i = 0; $i < 380; $i++) {
            Employee::create([
                'first_name' => $faker->firstName,
                'last_name' => $faker->lastName,
                'email' => $faker->unique()->safeEmail,
                'phone' => $faker->numerify('09#########'),
                'employment_type_id' => $faker->randomElement([1, 2, 3]), // Example: 1=Full-time, 2=Part-time, 3=Contract
                'status_id' => $faker->randomElement([1, 2]), // Example: 1=Active, 2=Inactive
                'monthly_salary' => $faker->numberBetween(15000, 80000),
                'attendance_rate' => $faker->randomFloat(2, 80, 100),
                'date_hired' => $faker->dateTimeBetween('-2 years', 'now'),
                'date_resigned' => $faker->optional(0.2)->dateTimeBetween('now', '+1 year'),
                'is_active' => $faker->boolean(80),
            ]);
        }
    }
}
