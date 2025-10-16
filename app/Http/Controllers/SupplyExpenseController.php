<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\SupplyExpense;
use Illuminate\Support\Facades\Auth;

class SupplyExpenseController extends Controller
{
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
