<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function index()
    {
        $projectCount = \App\Models\Project::count();
        $ongoingCount = \App\Models\Project::where('status', 'Ongoing')->count();
        $completedCount = \App\Models\Project::where('status', 'Completed')->count();

        $contractStatusId = \App\Models\EmploymentType::where('name', 'Contract')->value('id');
        $fullTimeStatusId = \App\Models\EmploymentType::where('name', 'Full-time')->value('id');
        $partTimeStatusId = \App\Models\EmploymentType::where('name', 'Part-time')->value('id');

        $contractCount = \App\Models\Employee::where('employment_type_id', $contractStatusId)->count();
        $fullTimeCount = \App\Models\Employee::where('employment_type_id', $fullTimeStatusId)->count();
        $partTimeCount = \App\Models\Employee::where('employment_type_id', $partTimeStatusId)->count();
        return Inertia::render('dashboard', [
            'projectCount' => $projectCount,
            'ongoingCount' => $ongoingCount,
            'completedCount' => $completedCount,
            'contractCount' => $contractCount,
            'fullTimeCount' => $fullTimeCount,
            'partTimeCount' => $partTimeCount,
        ]);
    }
}
