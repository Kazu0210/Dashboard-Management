<?php

namespace App\Http\Controllers;

use App\Models\Client;
use Illuminate\Http\Request;

class ClientController extends Controller
{
    public function index()
    {
        $clients = Client::orderByDesc('created_at')->get();
        return inertia('Clients/Index', ['clients' => $clients]);
    }

    public function create()
    {
        return inertia('Clients/Create');
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|unique:clients,email',
            'phone' => 'nullable|string|max:50',
            'address' => 'nullable|string|max:255',
        ]);
        Client::create($validated);
        return redirect()->route('admin.clients.index')->with('success', 'Client created successfully.');
    }

    public function show($id)
    {
        $client = Client::findOrFail($id);
        return inertia('Clients/Show', ['client' => $client]);
    }

    public function edit($id)
    {
        $client = Client::findOrFail($id);
        return inertia('Clients/Edit', ['client' => $client]);
    }

    public function update(Request $request, $id)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|unique:clients,email,' . $id,
            'phone' => 'nullable|string|max:50',
            'address' => 'nullable|string|max:255',
        ]);
        $client = Client::findOrFail($id);
        $client->update($validated);
        return redirect()->route('admin.clients.index')->with('success', 'Client updated successfully.');
    }

    public function destroy($id)
    {
        $client = Client::findOrFail($id);
        $client->delete();
        return redirect()->route('admin.clients.index')->with('success', 'Client deleted successfully.');
    }
}
