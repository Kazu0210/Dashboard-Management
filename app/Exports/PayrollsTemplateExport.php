<?php

namespace App\Exports;

use Maatwebsite\Excel\Concerns\WithHeadings;
use Maatwebsite\Excel\Concerns\WithColumnWidths;

class PayrollsTemplateExport implements WithHeadings, WithColumnWidths
{
    /**
     * Set custom column widths for the template.
     */
    public function columnWidths(): array
    {
        return [
            'A' => 18, // Employee
            'B' => 18, // Pay Period Start
            'C' => 18, // Pay Period End
            'D' => 14, // Basic Salary
            'E' => 14, // Allowances
            'F' => 14, // Deductions
            'G' => 14, // Net Pay
            'H' => 10, // Status
            'I' => 18, // Paid At
        ];
    }

    public function headings(): array
    {
        return [
            'Employee',
            'Pay Period Start',
            'Pay Period End',
            'Basic Salary',
            'Allowances',
            'Deductions',
            'Net Pay',
            'Status',
            'Paid At',
        ];
    }
}
