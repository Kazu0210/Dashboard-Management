<?php

namespace App\Http\Controllers;

use App\Models\Project;
use App\Models\ProjectStatus;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\DB;

class GuestController extends Controller
{
    public function index()
    {
        $project_status = ProjectStatus::all();
        $project_count = Project::count();
        
        return Inertia::render('welcome', [
            'project_status' => $project_status->toArray(),
            'project_count' => $project_count
        ]);
    }
}
