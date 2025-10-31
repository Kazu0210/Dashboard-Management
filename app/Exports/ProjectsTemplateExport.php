<?php

namespace App\Exports;

use Maatwebsite\Excel\Concerns\WithHeadings;
use Maatwebsite\Excel\Concerns\WithColumnWidths;

class ProjectsTemplateExport implements WithHeadings, WithColumnWidths
{
    /**
     * Set custom column widths for the template.
     */
    public function columnWidths(): array
    {
        return [
            'A' => 20, // Project Name
            'B' => 18, // Client
            'C' => 18, // Location
            'D' => 18, // Contract Amount
            'E' => 12, // Duration
            'F' => 12, // Status
            'G' => 12, // Personnel
            'H' => 12, // Payroll
            'I' => 12, // Supplies
            'J' => 16, // Billing Status
            'K' => 14, // Collected
            'L' => 14, // Net Income
        ];
    }
    public function headings(): array
    {
        return [
            'Project Name',
            'Client',
            'Location',
            'Contract Amount',
            'Duration',
            'Status',
            'Personnel',
            'Payroll',
            'Supplies',
            'Billing Status',
            'Collected',
            'Net Income',
        ];
    }
}
