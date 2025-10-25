<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\DoleCase;
use Inertia\Inertia;

class DoleCaseController extends Controller
{
    public function index()
    {
        $doleCases = DoleCase::orderByDesc('created_at')->get();
        return Inertia::render('Admin/DoleCaseList', [
            'doleCases' => $doleCases,
        ]);
    }

    public function create()
    {
        return Inertia::render('Admin/DoleCaseForm');
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'case_title' => 'required|string|max:255|unique:dole_cases,case_title',
            'filed_by' => 'required|string|max:255',
            'case_date' => 'required|date',
            'status' => 'required|in:open,investigating,resolved,closed',
            'details' => 'nullable|string',
            'resolution_date' => 'nullable|date',
            'assigned_personnel' => 'nullable|string|max:255',
            'remarks' => 'nullable|string',
        ]);

        DoleCase::create($validated);

        return redirect()->route('admin.dole-cases.index')->with('success', 'Dole case added successfully.');
    }

    public function edit($id)
    {
        $doleCase = DoleCase::findOrFail($id);
        return Inertia::render('Admin/DoleCaseForm', [
            'doleCase' => $doleCase,
            'editMode' => true,
        ]);
    }

    public function update(Request $request, $id)
    {
        $doleCase = DoleCase::findOrFail($id);
        $validated = $request->validate([
            'case_title' => 'required|string|max:255|unique:dole_cases,case_title,' . $doleCase->id,
            'filed_by' => 'required|string|max:255',
            'case_date' => 'required|date',
            'status' => 'required|in:open,investigating,resolved,closed',
            'details' => 'nullable|string',
            'resolution_date' => 'nullable|date',
            'assigned_personnel' => 'nullable|string|max:255',
            'remarks' => 'nullable|string',
        ]);

        $doleCase->update($validated);

        return redirect()->route('admin.dole-cases.index')->with('success', 'Dole case updated successfully.');
    }

    public function show($id)
    {
        $doleCase = DoleCase::findOrFail($id);
        return Inertia::render('Admin/DoleCaseForm', [
            'doleCase' => $doleCase,
            'viewMode' => true,
        ]);
    }

    public function destroy($id)
    {
        $doleCase = DoleCase::findOrFail($id);
        $doleCase->delete();

        return redirect()->route('admin.dole-cases.index')->with('success', 'Dole case deleted successfully.');
    }
}
