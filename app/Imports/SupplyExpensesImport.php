<?php

namespace App\Imports;

use App\Models\SupplyExpense;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;
use Maatwebsite\Excel\Concerns\ToModel;
use Maatwebsite\Excel\Concerns\WithHeadingRow;

class SupplyExpensesImport implements ToModel, WithHeadingRow
{
    public function model(array $row)
    {
        try {
            return new SupplyExpense([
                'category' => $row['category'] ?? '',
                'description' => $row['description'] ?? '',
                'amount' => $row['amount'] ?? 0,
                'expense_date' => $row['expense_date'] ?? null,
                'created_by' => Auth::id(),
            ]);
        } catch (\Exception $e) {
            Log::error('SupplyExpense import row failed', [
                'row' => $row,
                'message' => $e->getMessage(),
            ]);
            return null;
        }
    }
}
