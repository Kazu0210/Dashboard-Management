<?php

namespace App\Exports;

use App\Models\Project;
use Maatwebsite\Excel\Concerns\FromCollection;
use Maatwebsite\Excel\Concerns\WithHeadings;
use Maatwebsite\Excel\Concerns\WithColumnWidths;

class ProjectsExport implements FromCollection, WithHeadings, WithColumnWidths
{
    public function collection()
    {
        // Select and order columns as per template
        return Project::all([
            'project_name',
            'client',
            'location',
            'contract_amount',
            'duration',
            'status',
            'personnel',
            'payroll',
            'supplies',
            'billing_status',
            'collected',
            'net_income',
        ]);
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

    public function columnWidths(): array
    {
        return [
            'A' => 20,
            'B' => 18,
            'C' => 18,
            'D' => 18,
            'E' => 12,
            'F' => 12,
            'G' => 12,
            'H' => 12,
            'I' => 12,
            'J' => 16,
            'K' => 14,
            'L' => 14,
        ];
    }
}
