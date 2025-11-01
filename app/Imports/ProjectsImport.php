<?php

namespace App\Imports;

use App\Models\Project;
use Illuminate\Support\Facades\Log;
use Maatwebsite\Excel\Row;
use Maatwebsite\Excel\Concerns\OnEachRow;
use Maatwebsite\Excel\Concerns\WithHeadingRow;

class ProjectsImport implements OnEachRow, WithHeadingRow
{
    public function onRow(Row $row)
    {
        Log::info('Importing row: ' . json_encode($row->toArray()));
    }
}
