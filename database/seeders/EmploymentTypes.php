<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class EmploymentTypes extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $types = [
            'Full-time',
            'Part-time',
            'Contract',
            'Temporary',
            'Internship',
            'Freelance',
            'Seasonal',
            'Volunteer',
            'Commission-based',
            'On-call',
        ];

        $rows = [];
        $now = now();
        foreach ($types as $type) {
            $rows[] = [
                'name' => $type,
                'created_at' => $now,
                'updated_at' => $now,
            ];
        }

        DB::table('employment_types')->insertOrIgnore($rows);
    }
}
