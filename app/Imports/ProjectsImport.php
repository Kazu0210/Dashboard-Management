<?php

namespace App\Imports;

use App\Models\Project;
use Maatwebsite\Excel\Row;
use Maatwebsite\Excel\Concerns\OnEachRow;
use Maatwebsite\Excel\Concerns\WithHeadingRow;

class ProjectsImport implements OnEachRow, WithHeadingRow
{
    public function onRow(Row $row)
    {
        $row = $row->toArray();
        // Log the row data to laravel.log for debugging
        \Log::info('Imported Project Row:', $row);
        // Project::create([
        //     'project_name' => $row['project_name'] ?? '',
        //     'client' => $row['client'] ?? '',
        //     'location' => $row['location'] ?? '',
        //     'contract_amount' => $row['contract_amount'] ?? 0,
        //     'duration' => $row['duration'] ?? '',
        //     'status' => $row['status'] ?? '',
        //     'personnel' => $row['personnel'] ?? 0,
        //     'payroll' => $row['payroll'] ?? 0,
        //     'supplies' => $row['supplies'] ?? 0,
        //     'billing_status' => $row['billing_status'] ?? '',
        //     'collected' => $row['collected'] ?? 0,
        //     'net_income' => $row['net_income'] ?? 0,
        // ]);
    }
}
