<?php

namespace App\Imports;

use App\Models\Employee;
use App\Models\EmploymentType;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Log;
use Maatwebsite\Excel\Concerns\ToModel;
use Maatwebsite\Excel\Concerns\WithHeadingRow;

class EmployeesImport implements ToModel, WithHeadingRow
{
    /**
     * Clean amount value by removing parentheses
     *
     * @param mixed $value
     * @return mixed
     */
    private function cleanAmount($value)
    {
        if (is_string($value)) {
            // Remove parentheses from amounts like (101000) -> 101000
            $cleaned = preg_replace('/^\((\d+(?:\.\d+)?)\)$/', '$1', trim($value));
            return $cleaned;
        }
        return $value;
    }

    public function model(array $row)
    {
        // Get all employment types from the employment_types table
        $employmentTypes = EmploymentType::all()->pluck('id', 'name')->toArray();
        $employmentTypeFromRow = $row['employment_type'] ?? null;
        // Normalize function for comparison
        $normalize = function($str) {
            return strtolower(trim(str_replace(['-', '_'], '', $str)));
        };
        $normalizedRowValue = $normalize($employmentTypeFromRow);
        $normalizedTypes = array_map($normalize, array_keys($employmentTypes));
        $employmentTypeId = null;
        foreach ($normalizedTypes as $idx => $type) {
            if ($type === $normalizedRowValue) {
                // Get the original name to fetch the ID
                $originalName = array_keys($employmentTypes)[$idx];
                $employmentTypeId = $employmentTypes[$originalName];
                break;
            }
        }

        if ($employmentTypeId) {
            Log::info('Employment type MATCHED', [
                'row_value' => $employmentTypeFromRow,
                'matched_id' => $employmentTypeId
            ]);
            // Safely handle 'is_active' column
            $isActiveRaw = $row['is_active'] ?? null;
            // Default to false if missing or not 'yes'
            $isActive = strtolower(trim((string)$isActiveRaw)) === 'yes' ? true : false;



            $dateHired = isset($row['date_hired']) ? $this->excelDateToYmd($row['date_hired']) : null;
            $dateResigned = isset($row['date_resigned']) ? $this->excelDateToYmd($row['date_resigned']) : null;

            return new Employee([
                'first_name'       => $row['first_name'] ?? null,
                'last_name'        => $row['last_name'] ?? null,
                'email'            => $row['email'] ?? null,
                'phone'            => $row['phone'] ?? null,
                'employment_type_id' => $employmentTypeId,
                'status'           => $row['status'] ?? null,
                'monthly_salary'   => $this->cleanAmount($row['monthly_salary'] ?? null),
                'attendance_rate'  => $row['attendance_rate'] ?? null,
                'date_hired'       => $dateHired,
                'date_resigned'    => $dateResigned,
                'is_active'        => $isActive,
            ]);
        } else {
            Log::warning('Employment type NOT FOUND', [
                'row_value' => $employmentTypeFromRow,
                'all_types' => array_keys($employmentTypes)
            ]);
        }
    }

    /**
     * Convert Excel serial date or parse date string to Y-m-d format
     */
    private function excelDateToYmd($value) {
        if (is_numeric($value)) {
            // Excel's epoch starts at 1899-12-30
            $unixDate = ($value - 25569) * 86400;
            return gmdate('Y-m-d', $unixDate);
        }
        // Try to parse as date string
        $timestamp = strtotime($value);
        if ($timestamp !== false) {
            return date('Y-m-d', $timestamp);
        }
        return null;
    }

    public function startRow(): int
    {
        return 2; // Start importing from the second row (skip header)
    }
}
