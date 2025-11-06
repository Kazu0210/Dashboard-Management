<?php

namespace App\Exports;

use App\Models\Project;
use Maatwebsite\Excel\Concerns\FromCollection;
use Maatwebsite\Excel\Concerns\WithHeadings;
use Maatwebsite\Excel\Concerns\WithColumnWidths;

class ProjectsExport implements FromCollection, WithHeadings, WithColumnWidths
{
    public function collection()
    {
        // Select and order columns as per new template
        return Project::all([
            'project_number',
            'project_name',
            'year',
            'fte',
            'average_rate_per_employee',
            'bid_price_one_year',
            'half_year_bid_price',
            'status',
            'monthly_12',
            'withholding_tax',
            'vat',
            'agency_fee',
            'supplies',
            'equipment',
            'salary_expenses_year',
            'thirteenth_month_estimated',
            'silp_estimated',
            'sss_contribution',
            'philhealth_contribution',
            'pagibig_contribution',
            'ecc',
            'actual_supplies_cost_year',
            'actual_supplies_cost_jan_june',
            'actual_equipment_cost_year',
            'profit_margin_10_percent',
            'total_supplies_equipment',
            'vat_savings',
            'cost_of_sales',
            'total_service_income',
            'admin_cost_8000',
            'total',
        ]);
    }

    public function headings(): array
    {
        return [
            'Project Number',
            'Project Name',
            'Year',
            'FTE',
            'Average Rate per Employee',
            'Bid Price - One Year',
            'Half Year Bid Price',
            'Status',
            'Monthly (12)',
            'Withholding Tax',
            'VAT',
            'Agency Fee',
            'Supplies',
            'Equipment',
            'Salary Expenses (Year)',
            '13th Month Estimated',
            'SILP Estimated',
            'SSS Contribution',
            'Philhealth Contribution',
            'Pagibig Contribution',
            'ECC',
            'Actual Supplies Cost (Year)',
            'Actual Supplies Cost (Jan-June)',
            'Actual Equipment Cost (Year)',
            'Profit Margin (10%)',
            'Total Supplies and Equipment',
            'VAT Savings',
            'Cost of Sales',
            'Total Service Income',
            'Admin Cost (8000)',
            'Total',
        ];
    }

    public function columnWidths(): array
    {
        return [
            'A' => 15, // Project Number
            'B' => 25, // Project Name
            'C' => 8,  // Year
            'D' => 10, // FTE
            'E' => 20, // Average Rate per Employee
            'F' => 18, // Bid Price - One Year
            'G' => 18, // Half Year Bid Price
            'H' => 12, // Status
            'I' => 15, // Monthly (12)
            'J' => 15, // Withholding Tax
            'K' => 12, // VAT
            'L' => 12, // Agency Fee
            'M' => 12, // Supplies
            'N' => 12, // Equipment
            'O' => 18, // Salary Expenses (Year)
            'P' => 18, // 13th Month Estimated
            'Q' => 18, // SILP Estimated
            'R' => 15, // SSS Contribution
            'S' => 20, // Philhealth Contribution
            'T' => 18, // Pagibig Contribution
            'U' => 10, // ECC
            'V' => 20, // Actual Supplies Cost (Year)
            'W' => 25, // Actual Supplies Cost (Jan-June)
            'X' => 20, // Actual Equipment Cost (Year)
            'Y' => 18, // Profit Margin (10%)
            'Z' => 25, // Total Supplies and Equipment
            'AA' => 15, // VAT Savings
            'AB' => 15, // Cost of Sales
            'AC' => 20, // Total Service Income
            'AD' => 18, // Admin Cost (8000)
            'AE' => 15, // Total
        ];
    }
}
