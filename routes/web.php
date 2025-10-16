<?php
require __DIR__.'/settings.php';
require __DIR__.'/auth.php';

use App\Http\Controllers\Admin\DoleCaseController;
use App\Http\Controllers\EmployeeController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');


});



Route::middleware(['auth', 'verified', 'role:admin'])->prefix('admin')->name('admin.')->group(function () {
    Route::get('dole-cases', [DoleCaseController::class, 'index'])->name('dole-cases.index');
    Route::get('dole-cases/create', [DoleCaseController::class, 'create'])->name('dole-cases.create');
    Route::post('dole-cases', [DoleCaseController::class, 'store'])->name('dole-cases.store');
    Route::get('dole-cases/{id}/edit', [DoleCaseController::class, 'edit'])->name('dole-cases.edit');
    Route::put('dole-cases/{id}', [DoleCaseController::class, 'update'])->name('dole-cases.update');
    Route::get('dole-cases/{id}', [DoleCaseController::class, 'show'])->name('dole-cases.show');

    // Employee management
    Route::get('employees', [EmployeeController::class, 'index'])->name('employees.index');
    Route::get('employees/create', [EmployeeController::class, 'create'])->name('employees.create');
    Route::post('employees', [EmployeeController::class, 'store'])->name('employees.store');
    Route::get('employees/{employee}/edit', [EmployeeController::class, 'edit'])->name('employees.edit');
    Route::put('employees/{employee}', [EmployeeController::class, 'update'])->name('employees.update');
    Route::get('employees/{employee}', [EmployeeController::class, 'show'])->name('employees.show');
});
