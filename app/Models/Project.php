<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Project extends Model
{
    use HasFactory;

    protected $fillable = [
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
    ];

    /**
     * The attributes that should be cast.
     */
    protected $casts = [
        'year' => 'integer',
        'fte' => 'decimal:2',
        'average_rate_per_employee' => 'decimal:2',
        'bid_price_one_year' => 'decimal:2',
        'half_year_bid_price' => 'decimal:2',
        'monthly_12' => 'decimal:2',
        'withholding_tax' => 'decimal:2',
        'vat' => 'decimal:2',
        'agency_fee' => 'decimal:2',
        'supplies' => 'decimal:2',
        'equipment' => 'decimal:2',
        'salary_expenses_year' => 'decimal:2',
        'thirteenth_month_estimated' => 'decimal:2',
        'silp_estimated' => 'decimal:2',
        'sss_contribution' => 'decimal:2',
        'philhealth_contribution' => 'decimal:2',
        'pagibig_contribution' => 'decimal:2',
        'ecc' => 'decimal:2',
        'actual_supplies_cost_year' => 'decimal:2',
        'actual_supplies_cost_jan_june' => 'decimal:2',
        'actual_equipment_cost_year' => 'decimal:2',
        'profit_margin_10_percent' => 'decimal:2',
        'total_supplies_equipment' => 'decimal:2',
        'vat_savings' => 'decimal:2',
        'cost_of_sales' => 'decimal:2',
        'total_service_income' => 'decimal:2',
        'admin_cost_8000' => 'decimal:2',
        'total' => 'decimal:2',
    ];

    /**
     * Get the collections for the project.
     */
    public function collections()
    {
        return $this->hasMany(Collection::class);
    }
}
