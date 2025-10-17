<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class CollectionController extends Controller
{
    public function index()
    {
        return Inertia::render('Projects/ActualCollection');
    }
}
