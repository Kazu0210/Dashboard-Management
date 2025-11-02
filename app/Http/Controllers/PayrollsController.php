<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class PayrollsController extends Controller
{
    public function index()
    {
        return Inertia::render('Payrolls/Index');
    }
}
