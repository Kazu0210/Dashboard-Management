<?php

namespace App\Http\Controllers;

use App\Models\Employee;
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
}
