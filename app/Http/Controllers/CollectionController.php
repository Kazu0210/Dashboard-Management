<?php

namespace App\Http\Controllers;

use App\Models\Collection;
use App\Models\Project;
use Illuminate\Http\Request;
use Inertia\Inertia;

class CollectionController extends Controller
{
    public function index()
    {
        return Inertia::render('Collections/Index');
    }

    public function create()
    {
        $projects = Project::all();
        return Inertia::render('Collections/Create', [
            'projects' => $projects
        ]);
    }

    public function store()
    {
        $request = request()->validate([
            'date' => 'required|date',
            'project_id' => 'required|exists:projects,id',
            'collector' => 'required|string|max:255',
            'amount' => 'required|numeric|min:0',
            'notes' => 'nullable|string|max:1000',
        ]);

        Collection::create($request);

        return redirect()->route('admin.collections.index')->with('success', 'Collection created successfully.');
    }
}
