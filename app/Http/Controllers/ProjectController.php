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
        $project_count = $projects->count();
        $completed_count = $projects->where('status', 'Completed')->count();
        $ongoing_count = $projects->where('status', 'Ongoing')->count();
        $total_billed = $projects->sum('contract_amount');

        return Inertia::render('Projects/Index', [
            'projects' => $projects,
            'project_count' => $project_count,
            'completed_count' => $completed_count,
            'ongoing_count' => $ongoing_count,
            'total_billed' => $total_billed,
        ]);
    }

    public function create()
    {
        return Inertia::render('Projects/Create');
    }

    public function store()
    {
        $data = request()->validate([
            'project_name' => 'required|string|max:255',
            'client' => 'required|string|max:255',
            'location' => 'required|string|max:255',
            'contract_amount' => 'required|numeric|min:0',
            'duration' => 'required|string|max:50',
            'personnel' => 'required|integer|min:0',
            'payroll' => 'required|numeric|min:0',
            'supplies' => 'required|numeric|min:0',
            'billing_status' => 'required|string|max:50',
            'collected' => 'required|numeric|min:0',
            'net_income' => 'required|numeric|min:0',
            'status' => 'required|string|max:50',
        ]);

        $project = Project::create($data);

        return redirect()->route('admin.projects.index')->with('success', 'Project created successfully.');
    }

    public function edit($id)
    {
        $project = Project::findOrFail($id);
        return Inertia::render('Projects/Edit', [
            'project' => $project
        ]);
    }

    public function update($id)
    {
        $data = request()->validate([
            'project_name' => 'required|string|max:255',
            'client' => 'required|string|max:255',
            'location' => 'required|string|max:255',
            'contract_amount' => 'required|numeric|min:0',
            'duration' => 'required|string|max:50',
            'personnel' => 'required|integer|min:0',
            'payroll' => 'required|numeric|min:0',
            'supplies' => 'required|numeric|min:0',
            'billing_status' => 'required|string|max:50',
            'collected' => 'required|numeric|min:0',
            'net_income' => 'required|numeric|min:0',
            'status' => 'required|string|max:50',
        ]);

        $project = Project::findOrFail($id);
        $project->update($data);

        return redirect()->route('admin.projects.index')->with('success', 'Project updated successfully.');
    }

    public function destroy($id)
    {
        $project = Project::findOrFail($id);
        $project->delete();
        return redirect()->route('admin.projects.index')->with('success', 'Project deleted successfully.');
    }
}
