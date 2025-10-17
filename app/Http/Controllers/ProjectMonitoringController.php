<?php
namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class ProjectMonitoringController extends Controller
{
    public function index()
    {
        return Inertia::render('Monitoring/ProjectMonitoring');
    }
}
