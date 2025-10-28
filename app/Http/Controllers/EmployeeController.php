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
            ->leftJoin('statuses', 'employees.status_id', '=', 'statuses.id')
            ->select(
                'employees.*',
                'employment_types.id as employment_type_id',
                'employment_types.name as employment_type_name',
                'statuses.id as status_id',
                'statuses.name as status_name'
            )
            ->get();

        $employee_count = Employee::count();
        $new_hired_count = Employee::whereYear('date_hired', now()->year)
            ->whereMonth('date_hired', now()->month)
            ->count();
        $resigned_count = Employee::whereNotNull('date_resigned')->count();

        $employees = $rows->map(function ($r) {
            return [
                'id' => $r->id,
                'first_name' => $r->first_name,
                'last_name' => $r->last_name,
                'email' => $r->email,
                'phone' => $r->phone,
                'employment_type' => $r->employment_type_id ? ['id' => $r->employment_type_id, 'name' => $r->employment_type_name] : null,
                'status' => $r->status_id ? ['id' => $r->status_id, 'name' => $r->status_name] : null,
                'monthly_salary' => $r->monthly_salary,
                'attendance_rate' => $r->attendance_rate,
                'date_hired' => $r->date_hired,
                'date_resigned' => $r->date_resigned,
                'is_active' => (bool) $r->is_active,
                'created_at' => $r->created_at,
                'updated_at' => $r->updated_at,
            ];
        })->toArray();

        return \Inertia\Inertia::render('Employees/Index', [
            'employees' => $employees,
            'types' => DB::table('employment_types')->get()->toArray(),
            'statuses' => DB::table('statuses')->get()->toArray(),
            'employee_count' => $employee_count,
            'new_hired_count' => $new_hired_count,
            'resigned_count' => $resigned_count
        ]);
    }

    public function create()
    {
        return \Inertia\Inertia::render('Employees/Create', [
            'types' => DB::table('employment_types')->get()->toArray(),
            'statuses' => DB::table('statuses')->get()->toArray(),
        ]);
    }

    public function store(Request $request)
    {

        $data = $request->validate([
            'first_name' => 'required|string|max:255',
            'last_name' => 'nullable|string|max:255',
            'email' => 'required|email|unique:employees,email',
            'phone' => 'nullable|string|max:50',
            'employment_type_id' => 'required|exists:employment_types,id',
            'status_id' => 'required|exists:statuses,id',
            'monthly_salary' => 'nullable|numeric',
            'attendance_rate' => 'nullable|numeric',
            'date_hired' => 'nullable|date',
            'date_resigned' => 'nullable|date',
            'is_active' => 'boolean',
        ]);

        Employee::create($data);

        return redirect()->route('admin.employees.index');
    }

    public function show($id)
    {
        $r = DB::table('employees')
            ->leftJoin('employment_types', 'employees.employment_type_id', '=', 'employment_types.id')
            ->leftJoin('statuses', 'employees.status_id', '=', 'statuses.id')
            ->select(
                'employees.*',
                'employment_types.id as employment_type_id',
                'employment_types.name as employment_type_name',
                'statuses.id as status_id',
                'statuses.name as status_name'
            )
            ->where('employees.id', $id)
            ->first();

        if (!$r) {
            abort(404);
        }

        $employee = [
            'id' => $r->id,
            'first_name' => $r->first_name,
            'last_name' => $r->last_name,
            'email' => $r->email,
            'phone' => $r->phone,
            'employment_type' => $r->employment_type_id ? ['id' => $r->employment_type_id, 'name' => $r->employment_type_name] : null,
            'status' => $r->status_id ? ['id' => $r->status_id, 'name' => $r->status_name] : null,
            'monthly_salary' => $r->monthly_salary,
            'attendance_rate' => $r->attendance_rate,
            'date_hired' => $r->date_hired,
            'date_resigned' => $r->date_resigned,
            'is_active' => (bool) $r->is_active,
            'created_at' => $r->created_at,
            'updated_at' => $r->updated_at,
        ];

        return \Inertia\Inertia::render('Employees/Show', [
            'employee' => $employee,
        ]);
    }

    public function edit($id)
    {
        $r = DB::table('employees')
            ->where('id', $id)
            ->first();

        if (!$r) {
            abort(404);
        }

        $employee = (array) $r;

        return \Inertia\Inertia::render('Employees/Edit', [
            'employee' => $employee,
            'types' => DB::table('employment_types')->get()->toArray(),
            'statuses' => DB::table('statuses')->get()->toArray(),
        ]);
    }

    public function update(Request $request, $id)
    {

        $data = $request->validate([
            'first_name' => 'required|string|max:255',
            'last_name' => 'nullable|string|max:255',
            'email' => 'required|email|unique:employees,email,'.$id,
            'phone' => 'nullable|string|max:50',
            'employment_type_id' => 'required|exists:employment_types,id',
            'status_id' => 'required|exists:statuses,id',
            'monthly_salary' => 'nullable|numeric',
            'attendance_rate' => 'nullable|numeric',
            'date_hired' => 'nullable|date',
            'date_resigned' => 'nullable|date',
            'is_active' => 'boolean',
        ]);

        DB::table('employees')->where('id', $id)->update($data + ['updated_at' => now()]);

        return redirect()->route('admin.employees.index');
    }

    public function destroy($id)
    {
        DB::table('employees')->where('id', $id)->delete();
        return redirect()->route('admin.employees.index');
    }
}
