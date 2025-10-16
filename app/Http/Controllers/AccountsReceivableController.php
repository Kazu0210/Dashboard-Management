<?php

namespace App\Http\Controllers;

use App\Models\AccountsReceivable;
use Illuminate\Http\Request;

class AccountsReceivableController extends Controller
{
    public function index()
    {
        $records = AccountsReceivable::with('payments')->orderByDesc('created_at')->get();
        return inertia('AccountsReceivable/Index', [
            'records' => $records
        ]);
    }

    public function create()
    {
        return inertia('AccountsReceivable/Create');
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'client_id' => 'required|exists:clients,id',
            'invoice_no' => 'required|string|unique:accounts_receivable,invoice_no',
            'amount' => 'required|numeric',
            'balance' => 'required|numeric',
            'invoice_date' => 'required|date',
            'due_date' => 'required|date',
            'status' => 'required|in:unpaid,partial,paid',
        ]);
        
        $record = \App\Models\AccountsReceivable::create($validated);
        return redirect()->route('accounts-receivable.index')->with('success', 'Account receivable created successfully.');
    }

    public function show($id)
    {
        $record = \App\Models\AccountsReceivable::findOrFail($id);
        return inertia('AccountsReceivable/Show', [
            'record' => $record
        ]);
    }

    public function edit($id)
    {
        $record = \App\Models\AccountsReceivable::findOrFail($id);
        return inertia('AccountsReceivable/Edit', [
            'record' => $record
        ]);
    }

    public function update(Request $request, $id)
    {
        $validated = $request->validate([
            'client_id' => 'required|exists:clients,id',
            'invoice_no' => 'required|string|unique:accounts_receivable,invoice_no,' . $id,
            'amount' => 'required|numeric',
            'balance' => 'required|numeric',
            'invoice_date' => 'required|date',
            'due_date' => 'required|date',
            'status' => 'required|in:unpaid,partial,paid',
        ]);
        $record = \App\Models\AccountsReceivable::findOrFail($id);
        $record->update($validated);
        return redirect()->route('accounts-receivable.index')->with('success', 'Account receivable updated successfully.');
    }

    public function destroy($id)
    {
    $record = \App\Models\AccountsReceivable::findOrFail($id);
    $record->delete();
    return redirect()->route('accounts-receivable.index')->with('success', 'Account receivable deleted successfully.');
    }
}
