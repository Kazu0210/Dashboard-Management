<?php

namespace Database\Seeders;

use Carbon\Carbon;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class SamplePayrollSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run()
    {
        $records = [];
        $statuses = ['pending', 'processed', 'paid'];

        for ($i = 1; $i <= 20; $i++) {
            $payPeriodStart = Carbon::create(2025, rand(1, 12), rand(1, 15));
            $payPeriodEnd = (clone $payPeriodStart)->addDays(14);
            $basicSalary = rand(15000, 40000);
            $allowances = rand(1000, 5000);
            $deductions = rand(500, 3000);
            $netPay = $basicSalary + $allowances - $deductions;
            $status = $statuses[array_rand($statuses)];
            $paidAt = $status === 'paid' ? Carbon::now()->subDays(rand(1, 30)) : null;

            $records[] = [
                'employee_id' => rand(1, 10),
                'pay_period_start' => $payPeriodStart->toDateString(),
                'pay_period_end' => $payPeriodEnd->toDateString(),
                'basic_salary' => $basicSalary,
                'allowances' => $allowances,
                'deductions' => $deductions,
                'net_pay' => $netPay,
                'status' => $status,
                'paid_at' => $paidAt,
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
            ];
        }

        DB::table('payrolls')->insert($records);
    }
}
