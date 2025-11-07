<?php

namespace Database\Seeders;

use App\Models\SupplyExpense;
use Carbon\Carbon;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class SampleExpenseSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run()
    {
        $expenses = [
            [
                'category' => 'Office Supplies',
                'description' => 'Printer ink and bond paper',
                'amount' => 1500.00,
                'expense_date' => Carbon::parse('2025-10-01'),
            ],
            [
                'category' => 'Utilities',
                'description' => 'Electric bill payment',
                'amount' => 3250.75,
                'expense_date' => Carbon::parse('2025-10-05'),
            ],
            [
                'category' => 'Transportation',
                'description' => 'Fuel for company vehicle',
                'amount' => 1800.00,
                'expense_date' => Carbon::parse('2025-10-10'),
            ],
            [
                'category' => 'Meals',
                'description' => 'Team lunch meeting',
                'amount' => 1200.50,
                'expense_date' => Carbon::parse('2025-10-12'),
            ],
            [
                'category' => 'Maintenance',
                'description' => 'Aircon servicing and cleaning',
                'amount' => 2500.00,
                'expense_date' => Carbon::parse('2025-10-15'),
            ],
        ];

        foreach ($expenses as $expense) {
            SupplyExpense::create($expense);
        }
    }
}
