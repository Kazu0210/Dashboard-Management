<?php

namespace App\Http\Controllers;

use App\Exports\ProjectsExport;


use App\Http\Requests\ImportProjectsRequest;
use App\Models\Project;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Maatwebsite\Excel\Facades\Excel;
use App\Exports\ProjectsTemplateExport;
use App\Imports\ProjectsImport;
use Illuminate\Support\Facades\Log;

class ProjectController extends Controller
{
    /**
     * Export all projects as Excel using template columns.
     */
    public function export()
    {
        return Excel::download(new ProjectsExport, 'Projects_Export.xlsx');
    }
    /**
     * Import projects from uploaded Excel file.
     */
    public function import(ImportProjectsRequest $request)
    {
        $request->validate([
            'file' => 'required|file|mimes:xlsx,xls',
        ]);
        try {
            Excel::import(new ProjectsImport, $request->file('file'));
            return redirect()->route('admin.projects.index')->with('success', 'Projects imported successfully.');
        } catch (\Exception $e) {
            Log::error('Import failed: ' . $e->getMessage(), [
                'trace' => $e->getTraceAsString(),
            ]);
            return redirect()->route('admin.projects.index')->with('error', 'Import failed: ' . $e->getMessage());
        }
    }
    public function downloadTemplate()
    {
        return Excel::download(new ProjectsTemplateExport, 'Projects_Import_Template.xlsx');
    }
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

    public function show($id)
    {
        $project = Project::findOrFail($id);
        return Inertia::render('Projects/Show', [
            'project' => $project
        ]);
    }

    public function destroy($id)
    {
        $project = Project::findOrFail($id);
        $project->delete();
        return redirect()->route('admin.projects.index')->with('success', 'Project deleted successfully.');
    }
}
