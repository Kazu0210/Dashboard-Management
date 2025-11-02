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
        // Log all details of the row to laravel.log
        static $count = 0;
        $count++;
        $employeeName = $row['employee'] ?? null;
        $employeeExists = false;
        if ($employeeName) {
            $employeeExists = Employee::whereRaw('CONCAT(first_name, " ", last_name) = ?', [$employeeName])->exists();
        }
        if ($employeeExists) {
            Log::info("Payroll import row #{$count}: Employee exists", [
                'row' => $row,
                'employee_exists' => true,
            ]);
            // You can add logic here for when the employee exists
        } else {
            Log::warning("Payroll import row #{$count}: Employee does NOT exist", [
                'row' => $row,
                'employee_exists' => false,
            ]);
            // You can add logic here for when the employee does not exist
        }
        // Do not insert any records
        return null;
    }

    public function startRow(): int
    {
        return 2; // Skip header
    }
}
