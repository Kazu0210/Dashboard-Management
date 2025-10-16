<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Models\Employee;

class EmployeeController extends Controller
{
    public function index()
    {
        $rows = DB::table('employees')
            ->leftJoin('employment_types', 'employees.employment_type_id', '=', 'employment_types.id')
            ->select(
                'employees.*',
                'employment_types.id as employment_type_id',
                'employment_types.name as employment_type_name'
            )
            ->get();

        $employees = $rows->map(function ($r) {
            return [
                'id' => $r->id,
                'first_name' => $r->first_name,
                'last_name' => $r->last_name,
                'email' => $r->email,
                'phone' => $r->phone,
                'position' => $r->position,
                'hired_at' => $r->hired_at,
                'salary' => $r->salary,
                'employment_type' => $r->employment_type_id ? ['id' => $r->employment_type_id, 'name' => $r->employment_type_name] : null,
                'status' => ['name' => $r->status],
                'created_at' => $r->created_at,
                'updated_at' => $r->updated_at,
            ];
        })->toArray();

        return \Inertia\Inertia::render('Employees/Index', [
            'employees' => $employees,
            'types' => DB::table('employment_types')->get()->toArray(),
            'statuses' => ['active', 'inactive'],
        ]);
    }

    public function create()
    {
        return \Inertia\Inertia::render('Employees/Create', [
            'types' => DB::table('employment_types')->get()->toArray(),
            'statuses' => ['active', 'inactive'],
        ]);
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'first_name' => 'required|string|max:255',
            'last_name' => 'nullable|string|max:255',
            'email' => 'required|email|unique:employees,email',
            'phone' => 'nullable|string|max:50',
            'position' => 'nullable|string|max:255',
            'hired_at' => 'nullable|date',
            'salary' => 'nullable|numeric',
            'employment_type_id' => 'required|exists:employment_types,id',
            'status' => 'required|in:active,inactive',
        ]);

        Employee::create($data);

        return redirect()->route('admin.employees.index');
    }
}
