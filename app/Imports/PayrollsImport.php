<?php

namespace App\Imports;

use App\Models\Payrolls;
use App\Models\Employee;
use Illuminate\Support\Facades\Log;
use Maatwebsite\Excel\Concerns\ToModel;
use Maatwebsite\Excel\Concerns\WithHeadingRow;
use Maatwebsite\Excel\Concerns\WithStartRow;

class PayrollsImport implements ToModel, WithHeadingRow, WithStartRow
{
    public function model(array $row)
    {
        // Try to find employee by name (assuming format: First Last)
        $employeeName = $row['employee'] ?? null;
        $employeeId = null;
        if ($employeeName) {
            $parts = preg_split('/\s+/', trim($employeeName));
            if (count($parts) >= 2) {
                $firstName = $parts[0];
                $lastName = $parts[1];
                $employee = Employee::where('first_name', $firstName)
                    ->where('last_name', $lastName)
                    ->first();
                if ($employee) {
                    $employeeId = $employee->id;
                }
            }
        }
        if (!$employeeId) {
            Log::warning('Payroll import: Employee not found', ['employee' => $employeeName]);
            return null;
        }
        return new Payrolls([
            'employee_id' => $employeeId,
            'pay_period_start' => $row['pay_period_start'] ?? null,
            'pay_period_end' => $row['pay_period_end'] ?? null,
            'basic_salary' => $row['basic_salary'] ?? null,
            'allowances' => $row['allowances'] ?? null,
            'deductions' => $row['deductions'] ?? null,
            'net_pay' => $row['net_pay'] ?? null,
            'status' => $row['status'] ?? null,
            'paid_at' => $row['paid_at'] ?? null,
        ]);
    }

    public function startRow(): int
    {
        return 2; // Skip header
    }
}
