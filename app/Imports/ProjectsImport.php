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

        // Map the row data to the expected model fields
        return new Project([
            'project_number' => $row['project_number'] ?? null,
            'project_name' => $row['project_name'] ?? null,
            'year' => $row['year'] ?? null,
            'fte' => $row['fte'] ?? null,
            'average_rate_per_employee' => $row['average_rate_per_employee'] ?? null,
            'bid_price_one_year' => $row['bid_price_one_year'] ?? null,
            'half_year_bid_price' => $row['half_year_bid_price'] ?? null,
            'status' => $row['status'] ?? 'ongoing',
            'monthly_12' => $row['monthly_12'] ?? null,
            'withholding_tax' => $row['withholding_tax'] ?? null,
            'vat' => $row['vat'] ?? null,
            'agency_fee' => $row['agency_fee'] ?? null,
            'supplies' => $row['supplies'] ?? null,
            'equipment' => $row['equipment'] ?? null,
            'salary_expenses_year' => $row['salary_expenses_year'] ?? null,
            'thirteenth_month_estimated' => $row['thirteenth_month_estimated'] ?? null,
            'silp_estimated' => $row['silp_estimated'] ?? null,
            'sss_contribution' => $row['sss_contribution'] ?? null,
            'philhealth_contribution' => $row['philhealth_contribution'] ?? null,
            'pagibig_contribution' => $row['pagibig_contribution'] ?? null,
            'ecc' => $row['ecc'] ?? null,
            'actual_supplies_cost_year' => $row['actual_supplies_cost_year'] ?? null,
            'actual_supplies_cost_jan_june' => $row['actual_supplies_cost_jan_june'] ?? null,
            'actual_equipment_cost_year' => $row['actual_equipment_cost_year'] ?? null,
            'profit_margin_10_percent' => $row['profit_margin_10_percent'] ?? null,
            'total_supplies_equipment' => $row['total_supplies_equipment'] ?? null,
            'vat_savings' => $row['vat_savings'] ?? null,
            'cost_of_sales' => $row['cost_of_sales'] ?? null,
            'total_service_income' => $row['total_service_income'] ?? null,
            'admin_cost_8000' => $row['admin_cost_8000'] ?? null,
            'total' => $row['total'] ?? null,
        ]);
    }

    public function startRow(): int
    {
        return 2; // Start importing from the second row (skip header)
    }
}
