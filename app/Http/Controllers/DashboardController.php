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
        return Inertia::render('dashboard', [
            'projectCount' => $projectCount,
            'ongoingCount' => $ongoingCount,
            'completedCount' => $completedCount,
        ]);
    }
}
