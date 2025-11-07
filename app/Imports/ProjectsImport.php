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

    /**
    * @param array $row
    *
    * @return \Illuminate\Database\Eloquent\Model|null
    */
    public function model(array $row)
    {
        // Log the row for debugging
        Log::info('Importing project row:', $row);

        // Skip empty rows
        if (empty(array_filter($row))) {
            return null;
        }

        // Log specific debugging for total_supplies_equipment
        $totalSuppliesEquipmentRaw = $row['total_supplies_equipment'] ?? $row['total_supplies_and_equipment'] ?? null;
        $totalSuppliesEquipmentCleaned = $this->cleanAmount($totalSuppliesEquipmentRaw);
        
        Log::info('Total Supplies Equipment Debug:', [
            'raw_value' => $totalSuppliesEquipmentRaw,
            'cleaned_value' => $totalSuppliesEquipmentCleaned,
            'type_raw' => gettype($totalSuppliesEquipmentRaw),
            'type_cleaned' => gettype($totalSuppliesEquipmentCleaned),
            'available_keys' => array_keys($row),
        ]);

        // Map the row data to the expected model fields
        $projectData = [
            'project_number' => $row['project_number'] ?? null,
            'project_name' => $row['project_name'] ?? null,
            'year' => $row['year'] ?? null,
            'fte' => $this->cleanAmount($row['fte'] ?? null),
            'average_rate_per_employee' => $this->cleanAmount($row['average_rate_per_employee'] ?? null),
            'bid_price_one_year' => $this->cleanAmount($row['bid_price_one_year'] ?? null),
            'half_year_bid_price' => $this->cleanAmount($row['half_year_bid_price'] ?? null),
            'status' => strtolower($row['status'] ?? 'ongoing'),
            'monthly_12' => $this->cleanAmount($row['monthly_12'] ?? null),
            'withholding_tax' => $this->cleanAmount($row['withholding_tax'] ?? null),
            'vat' => $this->cleanAmount($row['vat'] ?? null),
            'agency_fee' => $this->cleanAmount($row['agency_fee'] ?? null),
            'supplies' => $this->cleanAmount($row['supplies'] ?? null),
            'equipment' => $this->cleanAmount($row['equipment'] ?? null),
            'salary_expenses_year' => $this->cleanAmount($row['salary_expenses_year'] ?? null),
            'thirteenth_month_estimated' => $this->cleanAmount($row['thirteenth_month_estimated'] ?? null),
            'silp_estimated' => $this->cleanAmount($row['silp_estimated'] ?? null),
            'sss_contribution' => $this->cleanAmount($row['sss_contribution'] ?? null),
            'philhealth_contribution' => $this->cleanAmount($row['philhealth_contribution'] ?? null),
            'pagibig_contribution' => $this->cleanAmount($row['pagibig_contribution'] ?? null),
            'ecc' => $this->cleanAmount($row['ecc'] ?? null),
            'actual_supplies_cost_year' => $this->cleanAmount($row['actual_supplies_cost_year'] ?? null),
            'actual_supplies_cost_jan_june' => $this->cleanAmount($row['actual_supplies_cost_jan_june'] ?? null),
            'actual_equipment_cost_year' => $this->cleanAmount($row['actual_equipment_cost_year'] ?? null),
            'profit_margin_10_percent' => $this->cleanAmount($row['profit_margin_10_percent'] ?? null),
            'total_supplies_equipment' => $this->cleanAmount($row['total_supplies_equipment'] ?? $row['total_supplies_and_equipment'] ?? null),
            'vat_savings' => $this->cleanAmount($row['vat_savings'] ?? null),
            'cost_of_sales' => $this->cleanAmount($row['cost_of_sales'] ?? null),
            'total_service_income' => $this->cleanAmount($row['total_service_income'] ?? null),
            'admin_cost_8000' => $this->cleanAmount($row['admin_cost_8000'] ?? null),
            'total' => $this->cleanAmount($row['total'] ?? null),
        ];

        // Log the final data being saved
        Log::info('Creating project with data:', $projectData);

        return new Project($projectData);
    }

    public function startRow(): int
    {
        return 2; // Start importing from the second row (skip header)
    }
}
