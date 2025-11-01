<?php

namespace App\Imports;

use App\Models\Project;
use Illuminate\Support\Facades\Log;
use Maatwebsite\Excel\Concerns\ToModel;
use Maatwebsite\Excel\Concerns\WithHeadingRow;
use Maatwebsite\Excel\Concerns\WithStartRow;

class ProjectsImport implements ToModel, WithHeadingRow, WithStartRow
{
    /**
    * @param array $rows
    *
    * @return \Illuminate\Database\Eloquent\Model|null
    */
    public function model(array $row)
    {
        // Access columns by header name, e.g., $row['project_name']
        Log::info('Excel row:', $row);
        // Example: return new Project([
        //     'name' => $row['project_name'],
        //     'description' => $row['description'],
        // ]);
    }

    public function startRow(): int
    {
        return 2; // Start importing from the second row (skip header)
    }
}
