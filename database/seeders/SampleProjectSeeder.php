<?php

namespace Database\Seeders;

use App\Models\Project;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Faker\Factory as Faker;

class SampleProjectSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $faker = Faker::create();

        $statuses = ['Ongoing', 'Completed', 'On Hold', 'Pending'];
        $billingStatuses = ['Unbilled', 'Partial', 'Fully Billed', 'Collected'];

        for ($i = 0; $i < 100; $i++) {
            $contractAmount = $faker->numberBetween(500000, 10000000);
            $collected = $faker->numberBetween(0, $contractAmount);
            $supplies = $faker->numberBetween(50000, 500000);
            $payroll = $faker->numberBetween(100000, 800000);
            $netIncome = $contractAmount - ($payroll + $supplies);

            Project::create([
                'project_name'   => $faker->bs() . ' Project',
                'client'         => $faker->company(),
                'location'       => $faker->city(),
                'contract_amount'=> $contractAmount,
                'duration'       => $faker->numberBetween(1, 24) . ' months',
                'status'         => $faker->randomElement($statuses),
                'personnel'      => $faker->numberBetween(5, 100),
                'payroll'        => $payroll,
                'supplies'       => $supplies,
                'billing_status' => $faker->randomElement($billingStatuses),
                'collected'      => $collected,
                'net_income'     => $netIncome,
            ]);
        }
    }
}
