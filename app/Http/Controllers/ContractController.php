<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Contract;
use Illuminate\Support\Facades\Auth;

class ContractController extends Controller
{
    public function index()
    {
        return Inertia::render('Contracts/Index');
    }

    public function create()
    {
        return Inertia::render('Contracts/Create');
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'contract_number' => 'required|string|max:255',
            'project_name' => 'required|string|max:255',
            'client' => 'required|string|max:255',
            'contract_price' => 'required|numeric',
            'start_date' => 'nullable|date',
            'end_date' => 'nullable|date|after_or_equal:start_date',
            'status' => 'nullable|string|max:50',
            'notes' => 'nullable|string',
        ]);

        $data['created_by'] = Auth::id();

        Contract::create($data);

        return redirect()->route('admin.contracts.index');
    }
}
