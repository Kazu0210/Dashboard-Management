<?php

namespace App\Exports;

use App\Models\SupplyExpense;
use Maatwebsite\Excel\Concerns\FromCollection;
use Maatwebsite\Excel\Concerns\WithHeadings;
use Maatwebsite\Excel\Concerns\ShouldAutoSize;

class SupplyExpensesExport implements FromCollection, WithHeadings, ShouldAutoSize
{
    public function collection()
    {
        return SupplyExpense::select('category', 'description', 'amount', 'expense_date', 'created_by')->get()->map(function ($row) {
            return [
                'category' => $row->category,
                'description' => $row->description,
                'amount' => $row->amount,
                'expense_date' => $row->expense_date ? substr($row->expense_date, 0, 10) : '',
                'created_by' => $row->created_by,
            ];
        });
    }

    public function headings(): array
    {
        return [
            'Category',
            'Description',
            'Amount',
            'Expense Date',
            'Created By',
        ];
    }
}
