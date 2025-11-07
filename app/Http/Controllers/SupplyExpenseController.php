<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\SupplyExpense;
use Illuminate\Support\Facades\Auth;
use App\Exports\SupplyExpensesTemplateExport;
use App\Exports\SupplyExpensesExport;
use Maatwebsite\Excel\Facades\Excel;
use App\Imports\SupplyExpensesImport;
use Illuminate\Support\Facades\Log;

class SupplyExpenseController extends Controller
{
    /**
     * Export all supply expenses to Excel
     */
    public function export()
    {
        $date = now()->format('Y-m-d');
        $fileName = "SupplyExpenses_Export_{$date}.xlsx";
        return Excel::download(new SupplyExpensesExport, $fileName);
    }

    /**
     * Import supply expenses from Excel file
     */
    public function import(Request $request)
    {
        $request->validate([
            'file' => 'required|file|mimes:xlsx,xls',
        ]);

        try {
            Excel::import(new SupplyExpensesImport, $request->file('file'));
        } catch (\Exception $e) {
            Log::error('SupplyExpense import failed', [
                'message' => $e->getMessage(),
                'trace' => $e->getTraceAsString(),
            ]);
            return response()->json(['message' => 'Import failed', 'error' => $e->getMessage()], 500);
        }

        return response()->json(['message' => 'Supply expenses imported successfully.'], 200);
    }
    /**
     * Download Excel template for supply expenses import
     */
    public function downloadTemplate()
    {
        return Excel::download(new SupplyExpensesTemplateExport, 'SupplyExpenses_Import_Template.xlsx');
    }
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $expenses = SupplyExpense::with('creator')->orderBy('expense_date', 'desc')->paginate(20);

        return Inertia::render('SupplyExpenses/Index', [
            'expenses' => $expenses,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('SupplyExpenses/Create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $data = $request->validate([
            'category' => 'required|string|max:255',
            'description' => 'nullable|string',
            'amount' => 'required|numeric|min:0',
            'expense_date' => 'nullable|date',
        ]);

        $data['created_by'] = Auth::id();

        SupplyExpense::create($data);

        return redirect()->route('admin.supply-expenses.index');
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $expense = SupplyExpense::with('creator')->findOrFail($id);

        return Inertia::render('SupplyExpenses/Show', [
            'expense' => $expense,
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        $expense = SupplyExpense::findOrFail($id);

        return Inertia::render('SupplyExpenses/Edit', [
            'expense' => $expense,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $expense = SupplyExpense::findOrFail($id);

        $data = $request->validate([
            'category' => 'required|string|max:255',
            'description' => 'nullable|string',
            'amount' => 'required|numeric|min:0',
            'expense_date' => 'nullable|date',
        ]);

        $expense->update($data);

        return redirect()->route('admin.supply-expenses.index');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $expense = SupplyExpense::findOrFail($id);
        $expense->delete();

        return redirect()->route('admin.supply-expenses.index');
    }
}
