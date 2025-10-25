<?php

namespace App\Http\Controllers;

use App\Models\AccountsReceivable;
use Illuminate\Http\Request;

class AccountsReceivableController extends Controller
{
    public function index()
    {
        $records = AccountsReceivable::with(['payments', 'client'])->orderByDesc('created_at')->get();
        $records = $records->map(function ($record) {
            return [
                'id' => $record->id,
                'invoice_no' => $record->invoice_no,
                'client_id' => $record->client_id,
                'client_name' => $record->client ? $record->client->name : null,
                'amount' => $record->amount,
                'balance' => $record->balance,
                'status' => $record->status,
            ];
        });
        return inertia('AccountsReceivable/Index', [
            'records' => $records
        ]);
    }

    public function create()
    {
        $clients = \App\Models\Client::orderBy('name')->get(['id', 'name']);
        return inertia('AccountsReceivable/Create', [
            'clients' => $clients
        ]);
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
        
        $record = AccountsReceivable::create($validated);
        return redirect()->route('admin.accounts-receivable.index')->with('success', 'Account receivable created successfully.');
    }

    public function show($id)
    {
        $record = AccountsReceivable::with('client')->findOrFail($id);
        $data = [
            'id' => $record->id,
            'invoice_no' => $record->invoice_no,
            'client_id' => $record->client_id,
            'client_name' => $record->client ? $record->client->name : null,
            'amount' => $record->amount,
            'balance' => $record->balance,
            'invoice_date' => $record->invoice_date,
            'due_date' => $record->due_date,
            'status' => $record->status,
        ];
        return inertia('AccountsReceivable/Show', [
            'record' => $data
        ]);
    }

    public function edit($id)
    {
        $record = AccountsReceivable::findOrFail($id);
        $clients = \App\Models\Client::orderBy('name')->get(['id', 'name']);
        return inertia('AccountsReceivable/Edit', [
            'record' => $record,
            'clients' => $clients
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
        $record = AccountsReceivable::findOrFail($id);
        $record->update($validated);
        return redirect()->route('admin.accounts-receivable.index')->with('success', 'Account receivable updated successfully.');
    }

    public function destroy($id)
    {
    $record = AccountsReceivable::findOrFail($id);
    $record->delete();
    return redirect()->route('admin.accounts-receivable.index')->with('success', 'Account receivable deleted successfully.');
    }
}
