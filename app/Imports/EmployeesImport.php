<?php

namespace App\Imports;

use App\Models\Employee;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Log;
use Maatwebsite\Excel\Concerns\ToModel;
use Maatwebsite\Excel\Concerns\WithHeadingRow;

class EmployeesImport implements ToModel, WithHeadingRow
{
    public function model(array $row)
    {
        // Employee::create($row);
        Log::info('Importing employee row', ['email' => $row['email'], 'row' => $row]);
    }

    public function startRow(): int
    {
        return 2; // Start importing from the second row (skip header)
    }
}
