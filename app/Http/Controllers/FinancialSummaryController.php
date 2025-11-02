<?php

namespace App\Http\Controllers;

use App\Models\Project;
use Illuminate\Http\Request;
use Inertia\Inertia;

class FinancialSummaryController extends Controller
{
    public function index()
    {
        $currentMonthContractValue = Project::where('created_at', '>=', now()->startOfMonth())
            ->sum('contract_amount');
        $totalContractValue = Project::whereYear('created_at', now()->year)
            ->sum('contract_amount');
            
        $summary = [
            ['category' => 'Total Contract Value', 'current_month' => $currentMonthContractValue, 'year_to_date' => $totalContractValue],
            ['category' => 'Total Payroll', 'current_month' => 3250000, 'year_to_date' => 36220000],
            ['category' => 'Total Supplies', 'current_month' => 450000, 'year_to_date' => 4410000],
            ['category' => 'Total Admin Expenses', 'current_month' => 540000, 'year_to_date' => 5720000],
            ['category' => 'Total Collected', 'current_month' => 6150000, 'year_to_date' => 67900000],
            ['category' => 'Accounts Receivable', 'current_month' => 5000000, 'year_to_date' => 5000000],
            ['category' => 'Gross Income', 'current_month' => 12000000, 'year_to_date' => 12000000],
            ['category' => 'Net Income', 'current_month' => 9100000, 'year_to_date' => 9100000],
        ];
        return Inertia::render('FinancialSummary/Index', [
            'summary' => $summary
        ]);
    }
}
