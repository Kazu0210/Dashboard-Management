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
        $date = now()->format('Y-m-d');
        $fileName = "Projects_Export_{$date}.xlsx";
        return Excel::download(new ProjectsExport, $fileName);
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
        $completed_count = $projects->where('status', 'completed')->count();
        $ongoing_count = $projects->where('status', 'ongoing')->count();
        $total_bid_amount = $projects->sum('bid_price_one_year');
        $total_service_income = $projects->sum('total_service_income');

        return Inertia::render('Projects/Index', [
            'projects' => $projects,
            'project_count' => $project_count,
            'completed_count' => $completed_count,
            'ongoing_count' => $ongoing_count,
            'total_bid_amount' => $total_bid_amount,
            'total_service_income' => $total_service_income,
        ]);
    }

    public function create()
    {
        return Inertia::render('Projects/Create');
    }

    public function store()
    {
        $data = request()->validate([
            'project_number' => 'required|string|max:100|unique:projects',
            'project_name' => 'required|string|max:255',
            'year' => 'required|integer|min:1900|max:2100',
            'fte' => 'nullable|numeric|min:0',
            'average_rate_per_employee' => 'nullable|numeric|min:0',
            'bid_price_one_year' => 'nullable|numeric|min:0',
            'half_year_bid_price' => 'nullable|numeric|min:0',
            'status' => 'required|string|max:50|in:ongoing,completed,pending',
            'monthly_12' => 'nullable|numeric|min:0',
            'withholding_tax' => 'nullable|numeric|min:0',
            'vat' => 'nullable|numeric|min:0',
            'agency_fee' => 'nullable|numeric|min:0',
            'supplies' => 'nullable|numeric|min:0',
            'equipment' => 'nullable|numeric|min:0',
            'salary_expenses_year' => 'nullable|numeric|min:0',
            'thirteenth_month_estimated' => 'nullable|numeric|min:0',
            'silp_estimated' => 'nullable|numeric|min:0',
            'sss_contribution' => 'nullable|numeric|min:0',
            'philhealth_contribution' => 'nullable|numeric|min:0',
            'pagibig_contribution' => 'nullable|numeric|min:0',
            'ecc' => 'nullable|numeric|min:0',
            'actual_supplies_cost_year' => 'nullable|numeric|min:0',
            'actual_supplies_cost_jan_june' => 'nullable|numeric|min:0',
            'actual_equipment_cost_year' => 'nullable|numeric|min:0',
            'profit_margin_10_percent' => 'nullable|numeric|min:0',
            'total_supplies_equipment' => 'nullable|numeric|min:0',
            'vat_savings' => 'nullable|numeric|min:0',
            'cost_of_sales' => 'nullable|numeric|min:0',
            'total_service_income' => 'nullable|numeric|min:0',
            'admin_cost_8000' => 'nullable|numeric|min:0',
            'total' => 'nullable|numeric|min:0',
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
        $project = Project::findOrFail($id);
        
        $data = request()->validate([
            'project_number' => 'required|string|max:100|unique:projects,project_number,' . $project->id,
            'project_name' => 'required|string|max:255',
            'year' => 'required|integer|min:1900|max:2100',
            'fte' => 'nullable|numeric|min:0',
            'average_rate_per_employee' => 'nullable|numeric|min:0',
            'bid_price_one_year' => 'nullable|numeric|min:0',
            'half_year_bid_price' => 'nullable|numeric|min:0',
            'status' => 'required|string|max:50|in:ongoing,completed,pending',
            'monthly_12' => 'nullable|numeric|min:0',
            'withholding_tax' => 'nullable|numeric|min:0',
            'vat' => 'nullable|numeric|min:0',
            'agency_fee' => 'nullable|numeric|min:0',
            'supplies' => 'nullable|numeric|min:0',
            'equipment' => 'nullable|numeric|min:0',
            'salary_expenses_year' => 'nullable|numeric|min:0',
            'thirteenth_month_estimated' => 'nullable|numeric|min:0',
            'silp_estimated' => 'nullable|numeric|min:0',
            'sss_contribution' => 'nullable|numeric|min:0',
            'philhealth_contribution' => 'nullable|numeric|min:0',
            'pagibig_contribution' => 'nullable|numeric|min:0',
            'ecc' => 'nullable|numeric|min:0',
            'actual_supplies_cost_year' => 'nullable|numeric|min:0',
            'actual_supplies_cost_jan_june' => 'nullable|numeric|min:0',
            'actual_equipment_cost_year' => 'nullable|numeric|min:0',
            'profit_margin_10_percent' => 'nullable|numeric|min:0',
            'total_supplies_equipment' => 'nullable|numeric|min:0',
            'vat_savings' => 'nullable|numeric|min:0',
            'cost_of_sales' => 'nullable|numeric|min:0',
            'total_service_income' => 'nullable|numeric|min:0',
            'admin_cost_8000' => 'nullable|numeric|min:0',
            'total' => 'nullable|numeric|min:0',
        ]);

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
