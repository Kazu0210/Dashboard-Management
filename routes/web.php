<?php
require __DIR__.'/settings.php';
require __DIR__.'/auth.php';

use App\Http\Controllers\AccountsReceivableController;
use App\Http\Controllers\Admin\DoleCaseController;
use App\Http\Controllers\ClientController;
use App\Http\Controllers\CollectionController;
use App\Http\Controllers\ContractController;
use App\Http\Controllers\ProjectMonitoringController;
use App\Http\Controllers\EmployeeController;
use App\Http\Controllers\GuestController;
use App\Http\Controllers\ProjectController;
use App\Http\Controllers\SupplyExpenseController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\DashboardController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

// Route for Guest Users
Route::get('/', [GuestController::class, 'index'])->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', [DashboardController::class, 'index'])->name('dashboard');
});

// Project monitoring API endpoints (authenticated)
// Route::middleware(['auth', 'verified'])->group(function () {
//     Route::get('projects', [ProjectMonitoringController::class, 'index'])->name('projects.index');
//     Route::post('projects', [ProjectMonitoringController::class, 'store'])->name('projects.store');
// });

Route::middleware(['auth', 'verified', 'role:admin'])->group(function () {
    Route::get('admin/employees/export', [EmployeeController::class, 'export'])->name('employees.export');
});

Route::middleware(['auth', 'verified', 'role:admin'])->prefix('admin')->name('admin.')->group(function () {
    Route::get('dole-cases', [DoleCaseController::class, 'index'])->name('dole-cases.index');
    Route::get('dole-cases/create', [DoleCaseController::class, 'create'])->name('dole-cases.create');
    Route::post('dole-cases', [DoleCaseController::class, 'store'])->name('dole-cases.store');
    Route::get('dole-cases/{id}/edit', [DoleCaseController::class, 'edit'])->name('dole-cases.edit');
    Route::put('dole-cases/{id}', [DoleCaseController::class, 'update'])->name('dole-cases.update');
    Route::get('dole-cases/{id}', [DoleCaseController::class, 'show'])->name('dole-cases.show');
    Route::delete('dole-cases/{id}/destroy', [DoleCaseController::class, 'destroy'])->name('dole-cases.destroy');

    // Employee management
    Route::get('employees', [EmployeeController::class, 'index'])->name('employees.index');
    Route::get('employees/create', [EmployeeController::class, 'create'])->name('employees.create');
    Route::post('employees', [EmployeeController::class, 'store'])->name('employees.store');
    Route::get('employees/{employee}/edit', [EmployeeController::class, 'edit'])->name('employees.edit');
    Route::put('employees/{employee}', [EmployeeController::class, 'update'])->name('employees.update');
    Route::delete('employees/{employee}', [EmployeeController::class, 'destroy'])->name('employees.destroy');
    Route::get('employees/{employee}', [EmployeeController::class, 'show'])->name('employees.show');
    Route::post('employees/import', [EmployeeController::class, 'import'])->name('employees.import');
    
    Route::get('employees/template/download', [EmployeeController::class, 'downloadTemplate'])->name('employees.template.download');

    // Contracts
    Route::get('contracts', [ContractController::class, 'index'])->name('contracts.index');
    Route::get('contracts/create', [ContractController::class, 'create'])->name('contracts.create');
    Route::post('contracts', [ContractController::class, 'store'])->name('contracts.store');
    Route::get('contracts/{id}', [ContractController::class, 'show'])->name('contracts.show');
    Route::get('contracts/{id}/edit', [ContractController::class, 'edit'])->name('contracts.edit');
    Route::put('contracts/{id}', [ContractController::class, 'update'])->name('contracts.update');
    Route::delete('contracts/{id}', [ContractController::class, 'destroy'])->name('contracts.destroy');

    // Supply Expenses
    Route::get('supply-expenses', [SupplyExpenseController::class, 'index'])->name('supply-expenses.index');
    Route::get('supply-expenses/create', [SupplyExpenseController::class, 'create'])->name('supply-expenses.create');
    Route::post('supply-expenses', [SupplyExpenseController::class, 'store'])->name('supply-expenses.store');
    Route::get('supply-expenses/{id}', [SupplyExpenseController::class, 'show'])->name('supply-expenses.show');
    Route::get('supply-expenses/{id}/edit', [SupplyExpenseController::class, 'edit'])->name('supply-expenses.edit');
    Route::put('supply-expenses/{id}', [SupplyExpenseController::class, 'update'])->name('supply-expenses.update');
    Route::delete('supply-expenses/{id}', [SupplyExpenseController::class, 'destroy'])->name('supply-expenses.destroy');

    // Accounts Receivable
    Route::get('accounts-receivable', [AccountsReceivableController::class, 'index'])->name('accounts-receivable.index');
    Route::get('accounts-receivable/create', [AccountsReceivableController::class, 'create'])->name('accounts-receivable.create');
    Route::post('accounts-receivable', [AccountsReceivableController::class, 'store'])->name('accounts-receivable.store');
    Route::get('accounts-receivable/{id}', [AccountsReceivableController::class, 'show'])->name('accounts-receivable.show');
    Route::get('accounts-receivable/{id}/edit', [AccountsReceivableController::class, 'edit'])->name('accounts-receivable.edit');
    Route::put('accounts-receivable/{id}', [AccountsReceivableController::class, 'update'])->name('accounts-receivable.update');
    Route::delete('accounts-receivable/{id}', [AccountsReceivableController::class, 'destroy'])->name('accounts-receivable.destroy');

    // Client Management
    Route::get('clients', [ClientController::class, 'index'])->name('clients.index');
    Route::get('clients/create', [ClientController::class, 'create'])->name('clients.create');
    Route::post('clients', [ClientController::class, 'store'])->name('clients.store');
    Route::get('clients/{id}', [ClientController::class, 'show'])->name('clients.show');
    Route::get('clients/{id}/edit', [ClientController::class, 'edit'])->name('clients.edit');
    Route::put('clients/{id}', [ClientController::class, 'update'])->name('clients.update');
    Route::delete('clients/{id}', [ClientController::class, 'destroy'])->name('clients.destroy');

    // Route::get('collection', [CollectionController::class, 'index'])->name('collection.index');

    // route::get('monitoring', [ProjectMonitoringController::class, 'index'])->name('monitoring.index');

    // User Management
    Route::get('users', [UserController::class, 'index'])->name('users.index');
    Route::get('users/create', [UserController::class, 'create'])->name('users.create');
    Route::post('users/create', [UserController::class, 'store'])->name('users.store');
    Route::get('users/{id}/edit', [UserController::class, 'edit'])->name('users.edit');
    Route::put('users/{id}/update', [UserController::class, 'update'])->name('users.update');
    Route::delete('users/{id}', [UserController::class, 'destroy'])->name('users.destroy');

    // Collection Route
    Route::get('collections', [CollectionController::class, 'index'])->name('collections.index');
    Route::get('collections/create', [CollectionController::class, 'create'])->name('collections.create');
    Route::get('collections/{id}/edit', [CollectionController::class, 'edit'])->name('collections.edit');
    Route::post('collections', [CollectionController::class, 'store'])->name('collections.store');
    Route::put('collections/{id}', [CollectionController::class, 'update'])->name('collections.update');
    Route::delete('collections/{id}', [CollectionController::class, 'delete'])->name('collections.delete');

    // Project Management
    Route::get('projects', [ProjectController::class, 'index'])->name('projects.index');
    Route::get('projects/create', [ProjectController::class, 'create'])->name('projects.create');
    Route::post('projects/create', [ProjectController::class, 'store'])->name('projects.store');
    Route::get('projects/{id}', [ProjectController::class, 'show'])->name('projects.show');
    Route::get('projects/{id}/edit', [ProjectController::class, 'edit'])->name('projects.edit');
    Route::put('projects/{id}', [ProjectController::class, 'update'])->name('projects.update');
    Route::delete('projects/{id}', [ProjectController::class, 'destroy'])->name('projects.destroy');

    // Import projects from Excel
    Route::post('projects/import', [ProjectController::class, 'import'])->name('projects.import');
    Route::get('projects/template/download', [ProjectController::class, 'downloadTemplate'])->name('projects.template.download');
    Route::get('projects/export', [ProjectController::class, 'export'])->name('projects.export');
});

