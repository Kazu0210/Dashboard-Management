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
        $collections = Collection::with('project')->orderBy('date', 'desc')->get();

        return Inertia::render('Collections/Index', [
            'collections' => $collections,
        ]);
    }

    public function create()
    {
        $projects = Project::all();
        return Inertia::render('Collections/Create', [
            'projects' => $projects
        ]);
    }

    public function edit($id)
    {
        $collection = Collection::findOrFail($id);
        $projects = Project::all();

        return Inertia::render('Collections/Edit', [
            'collection' => $collection,
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

    public function update($id)
    {
        $collection = Collection::findOrFail($id);

        $request = request()->validate([
            'date' => 'required|date',
            'project_id' => 'required|exists:projects,id',
            'collector' => 'required|string|max:255',
            'amount' => 'required|numeric|min:0',
            'notes' => 'nullable|string|max:1000',
        ]);

        $collection->update($request);

        return redirect()->route('admin.collections.index')->with('success', 'Collection updated successfully.');
    }

    public function delete($id)
    {
        $collection = Collection::findOrFail($id);
        $collection->delete();

        return redirect()->route('admin.collections.index')->with('success', 'Collection deleted successfully.');
    }
}
