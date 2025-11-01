<?php

namespace App\Exports;

use App\Models\Employee;
use Illuminate\Support\Facades\DB;
use Maatwebsite\Excel\Concerns\FromCollection;
use Maatwebsite\Excel\Concerns\WithHeadings;
use Maatwebsite\Excel\Concerns\WithMapping;
use Maatwebsite\Excel\Concerns\WithColumnWidths;

class EmployeesExport implements FromCollection, WithHeadings, WithMapping, WithColumnWidths
{
    public function collection()
    {
        return Employee::with(['employmentType', 'status'])->get();
    }

    public function map($employee): array
    {
        return [
            $employee->first_name,
            $employee->last_name,
            $employee->email,
            $employee->phone,
            $employee->employmentType ? $employee->employmentType->name : '',
            $employee->status ? $employee->status->name : '',
            $employee->monthly_salary,
            $employee->attendance_rate,
            $employee->date_hired,
            $employee->date_resigned,
            $employee->is_active ? 'Yes' : 'No',
        ];
    }

    public function headings(): array
    {
        return [
            'First Name',
            'Last Name',
            'Email',
            'Phone',
            'Employment Type',
            'Status',
            'Monthly Salary',
            'Attendance Rate',
            'Date Hired',
            'Date Resigned',
            'Is Active',
        ];
    }

    public function columnWidths(): array
    {
        return [
            'A' => 18,
            'B' => 18,
            'C' => 24,
            'D' => 16,
            'E' => 18,
            'F' => 14,
            'G' => 16,
            'H' => 16,
            'I' => 16,
            'J' => 16,
            'K' => 10,
        ];
    }
}
