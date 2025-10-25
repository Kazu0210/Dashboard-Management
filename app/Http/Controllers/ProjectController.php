<?php

namespace App\Http\Controllers;

use App\Models\Project;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ProjectController extends Controller
{
    public function index()
    {
        $projects = Project::all();
        return Inertia::render('Projects/Index', [
            'projects' => $projects
        ]);
    }

    public function create()
    {
        return Inertia::render('Projects/Create');
    }

    public function store()
    {
        $data = request()->validate([
            'name' => 'required|string|max:255',
            'status' => 'required|in:ongoing,completed,on-hold',
            'startDate' => 'required|date',
            'endDate' => 'required|date|after_or_equal:startDate',
            'manager' => 'required|string|max:255',
            'budget' => 'required|numeric|min:0',
        ]);

        // Convert camelCase to snake_case for DB
        $project = Project::create([
            'name' => $data['name'],
            'status' => $data['status'],
            'start_date' => $data['startDate'],
            'end_date' => $data['endDate'],
            'manager' => $data['manager'],
            'budget' => $data['budget'],
        ]);

        return redirect()->route('admin.projects.index')->with('success', 'Project created successfully.');
    }
}
