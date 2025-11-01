<?php

namespace App\Exports;

use Maatwebsite\Excel\Concerns\WithHeadings;
use Maatwebsite\Excel\Concerns\WithColumnWidths;

class EmployeesTemplateExport implements WithHeadings, WithColumnWidths
{
    /**
     * Set custom column widths for the template.
     */
    public function columnWidths(): array
    {
        return [
            'A' => 18, // First Name
            'B' => 18, // Last Name
            'C' => 24, // Email
            'D' => 16, // Phone
            'E' => 18, // Employment Type
            'F' => 14, // Status
            'G' => 16, // Monthly Salary
            'H' => 16, // Attendance Rate
            'I' => 16, // Date Hired
            'J' => 16, // Date Resigned
            'K' => 10, // Is Active
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
}
