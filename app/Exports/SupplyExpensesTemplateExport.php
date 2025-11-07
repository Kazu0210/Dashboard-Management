<?php

namespace App\Exports;

use Illuminate\Support\Collection;
use Maatwebsite\Excel\Concerns\FromCollection;
use Maatwebsite\Excel\Concerns\WithHeadings;
use Maatwebsite\Excel\Concerns\ShouldAutoSize;

class SupplyExpensesTemplateExport implements FromCollection, WithHeadings, ShouldAutoSize
{
    public function collection()
    {
        // Return a single sample row
        return new Collection([
            [
                'Category Example',
                'Description Example',
                '1000.00',
                '2025-01-01',
            ],
        ]);
    }

    public function headings(): array
    {
        return [
            'Category',
            'Description',
            'Amount',
            'Expense Date',
        ];
    }
}
