<?php

namespace App\Http\Controllers;

use App\Models\Employee;
use App\Models\Payrolls;
use Illuminate\Http\Request;
use Inertia\Inertia;

class PayrollsController extends Controller
{
    public function index()
    {
        return Inertia::render('Payrolls/Index');
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
}
