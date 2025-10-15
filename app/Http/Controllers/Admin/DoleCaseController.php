<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\DoleCase;
use Inertia\Inertia;

class DoleCaseController extends Controller
{
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

        return redirect()->back()->with('success', 'Dole case added successfully.');
    }
}
