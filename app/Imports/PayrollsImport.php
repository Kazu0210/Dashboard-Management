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
            // If employee exists on the employees table
            Log::info("Payroll import row #{$count}: Employee exists", [
                'row' => $row,
                'employee_exists' => true,
            ]);
            
            $employee = Employee::whereRaw('CONCAT(first_name, " ", last_name) = ?', [$employeeName])->first();
            $employeeId = $employee ? $employee->id : null;
            Log::info("Payroll import row #{$count}: Employee ID found", [
                'employee_id' => $employeeId,
            ]);

            // Convert Excel serial dates to Y-m-d or Y-m-d H:i:s
            $pay_period_start = isset($row['pay_period_start']) ? 
                (is_numeric($row['pay_period_start']) ? 
                    \PhpOffice\PhpSpreadsheet\Shared\Date::excelToDateTimeObject($row['pay_period_start'])->format('Y-m-d') : $row['pay_period_start']) : null;
            $pay_period_end = isset($row['pay_period_end']) ? 
                (is_numeric($row['pay_period_end']) ? 
                    \PhpOffice\PhpSpreadsheet\Shared\Date::excelToDateTimeObject($row['pay_period_end'])->format('Y-m-d') : $row['pay_period_end']) : null;
            $paid_at = isset($row['paid_at']) ? 
                (is_numeric($row['paid_at']) ? 
                    \PhpOffice\PhpSpreadsheet\Shared\Date::excelToDateTimeObject($row['paid_at'])->format('Y-m-d H:i:s') : $row['paid_at']) : null;

            $payrollRecord = Payrolls::create([
                'employee_id' => $employeeId,
                'pay_period_start' => $pay_period_start,
                'pay_period_end' => $pay_period_end,
                'basic_salary' => $row['basic_salary'] ?? 0,
                'allowances' => $row['allowances'] ?? 0,
                'deductions' => $row['deductions'] ?? 0,
                'net_pay' => $row['net_pay'] ?? 0,
                'status' => $row['status'] ?? 'pending',
                'paid_at' => $paid_at,
            ]);
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
