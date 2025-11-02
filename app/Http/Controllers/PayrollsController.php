<?php

namespace App\Http\Controllers;

use App\Imports\PayrollsImport;
use Illuminate\Support\Facades\Log;
use App\Models\Employee;
use App\Models\Payrolls;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Exports\PayrollsTemplateExport;
use Maatwebsite\Excel\Facades\Excel;

class PayrollsController extends Controller
{
    /**
     * Import payrolls from Excel file
     */
    public function import(Request $request)
    {
        $request->validate([
            'file' => 'required|file|mimes:xlsx,xls',
        ]);

        try {
            Excel::import(new PayrollsImport, $request->file('file'));
        } catch (\Exception $e) {
            Log::error('Payroll import failed', [
                'message' => $e->getMessage(),
                'trace' => $e->getTraceAsString(),
            ]);
            return response()->json(['message' => 'Import failed', 'error' => $e->getMessage()], 500);
        }

        return response()->json(['message' => 'Payrolls imported successfully.'], 200);
    }
    public function downloadTemplate()
    {
        return Excel::download(new PayrollsTemplateExport, 'Payrolls_Import_Template.xlsx');
    }
    public function destroy($id)
    {
        $payroll = Payrolls::findOrFail($id);
        $payroll->delete();
        return redirect()->route('admin.payrolls.index')->with('success', 'Payroll deleted successfully.');
    }
    public function edit($id)
    {
        $payroll = Payrolls::findOrFail($id);
        $employees = Employee::all();
        return Inertia::render('Payrolls/Edit', [
            'payroll' => $payroll,
            'employees' => $employees
        ]);
    }

    public function update(Request $request, $id)
    {
        $validated = $request->validate([
            'employee_id' => 'required|exists:employees,id',
            'pay_period_start' => 'required|date',
            'pay_period_end' => 'required|date|after_or_equal:pay_period_start',
            'basic_salary' => 'required|numeric',
            'allowances' => 'nullable|numeric',
            'deductions' => 'nullable|numeric',
            'net_pay' => 'required|numeric',
            'status' => 'required|string',
            'paid_at' => 'nullable|date',
        ]);
        $payroll = Payrolls::findOrFail($id);
        $payroll->update($validated);
        return redirect()->route('admin.payrolls.index')->with('success', 'Payroll updated successfully.');
    }
    public function index()
    {
        $payrolls = Payrolls::with('employee')->get();
        $payrollsData = $payrolls->map(function ($payroll) {
            return [
                'id' => $payroll->id,
                'employee_name' => $payroll->employee ? $payroll->employee->first_name . ' ' . $payroll->employee->last_name : '',
                'pay_period_start' => $payroll->pay_period_start,
                'pay_period_end' => $payroll->pay_period_end,
                'basic_salary' => $payroll->basic_salary,
                'allowances' => $payroll->allowances,
                'deductions' => $payroll->deductions,
                'net_pay' => $payroll->net_pay,
                'status' => $payroll->status,
                'paid_at' => $payroll->paid_at,
            ];
        });
        return Inertia::render('Payrolls/Index', [
            'payrolls' => $payrollsData
        ]);
    }

    public function create()
    {
        $employees = Employee::all();
        return Inertia::render('Payrolls/Create', [
            'employees' => $employees
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'employee_id' => 'required|exists:employees,id',
            'pay_period_start' => 'required|date',
            'pay_period_end' => 'required|date|after_or_equal:pay_period_start',
            'basic_salary' => 'required|numeric',
            'allowances' => 'nullable|numeric',
            'deductions' => 'nullable|numeric',
            'net_pay' => 'required|numeric',
            'status' => 'required|string',
            'paid_at' => 'nullable|date',
        ]);

        Payrolls::create($validated);

        return Inertia::render('Payrolls/Index');
    }

    public function view()
    {
        return Inertia::render('Payrolls/View');
    }

    public function show($id)
    {
        $payroll = Payrolls::with('employee')->findOrFail($id);
        $payrollData = [
            'id' => $payroll->id,
            'employee_name' => $payroll->employee ? $payroll->employee->first_name . ' ' . $payroll->employee->last_name : '',
            'pay_period_start' => $payroll->pay_period_start,
            'pay_period_end' => $payroll->pay_period_end,
            'basic_salary' => $payroll->basic_salary,
            'allowances' => $payroll->allowances,
            'deductions' => $payroll->deductions,
            'net_pay' => $payroll->net_pay,
            'status' => $payroll->status,
            'paid_at' => $payroll->paid_at,
        ];
        return Inertia::render('Payrolls/Show', [
            'payroll' => $payrollData
        ]);
    }
}
