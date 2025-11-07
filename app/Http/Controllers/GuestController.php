<?php

namespace App\Http\Controllers;

use App\Models\Project;
use App\Models\ProjectStatus;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;

class GuestController extends Controller
{
    public function index()
    {
        $project_status = ProjectStatus::all();
        $project_count = Project::count();
        $projects = Project::all();
        
        // Count ongoing projects (projects with FTE data > 0)
        $ongoing_projects_count = Project::where('status', 'ongoing')->count();

        // Log::info('Projects data: '.$projects);
        
        return Inertia::render('welcome', [
            'project_status' => $project_status->toArray(),
            'project_count' => $project_count,
            'projects' => $projects->toArray(),
            'ongoing_projects_count' => $ongoing_projects_count
        ]);
    }
}
