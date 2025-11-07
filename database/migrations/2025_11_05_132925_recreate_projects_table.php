<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::dropIfExists('projects');
        Schema::create('projects', function (Blueprint $table) {
            $table->id(); // Project ID
            $table->string('project_number', 100)->unique(); // Project Number
            $table->string('project_name', 255); // Project Name
            $table->integer('year'); // Year
            $table->decimal('fte', 8, 2)->nullable(); // FTE (Full Time Equivalent)
            $table->decimal('average_rate_per_employee', 15, 2)->nullable(); // Average Rate per Employee
            $table->decimal('bid_price_one_year', 15, 2)->nullable(); // Bid Price - One Year
            $table->decimal('half_year_bid_price', 15, 2)->nullable(); // Half Year Bid Price
            $table->string('status', 50)->default('ongoing'); // Status
            $table->decimal('monthly_12', 15, 2)->nullable(); // Monthly (12)
            $table->decimal('withholding_tax', 15, 2)->nullable(); // WITHHOLDING TAX
            $table->decimal('vat', 15, 2)->nullable(); // VAT
            $table->decimal('agency_fee', 15, 2)->nullable(); // Agency Fee
            $table->decimal('supplies', 15, 2)->nullable(); // Supplies
            $table->decimal('equipment', 15, 2)->nullable(); // Equipment
            $table->decimal('salary_expenses_year', 15, 2)->nullable(); // Salary Expenses (Year) As of June 2024
            $table->decimal('thirteenth_month_estimated', 15, 2)->nullable(); // 13th Month Estimated
            $table->decimal('silp_estimated', 15, 2)->nullable(); // SILP Estimated As of June 2024 Average
            $table->decimal('sss_contribution', 15, 2)->nullable(); // SSS Contribution (Average)
            $table->decimal('philhealth_contribution', 15, 2)->nullable(); // Philhealth Contribution (Average)
            $table->decimal('pagibig_contribution', 15, 2)->nullable(); // Pagibig Contribution (Average)
            $table->decimal('ecc', 15, 2)->nullable(); // ECC
            $table->decimal('actual_supplies_cost_year', 15, 2)->nullable(); // Actual Supplies Cost (Year)
            $table->decimal('actual_supplies_cost_jan_june', 15, 2)->nullable(); // Actual Supplies Cost (Jan-June)
            $table->decimal('actual_equipment_cost_year', 15, 2)->nullable(); // Actual Equipment Cost (Year)
            $table->decimal('profit_margin_10_percent', 15, 2)->nullable(); // Profit Margin (10%)
            $table->decimal('total_supplies_equipment', 15, 2)->nullable(); // Total Supplies and Equipment (Bid Price - Actual Acquisition Price)
            $table->decimal('vat_savings', 15, 2)->nullable(); // VAT Savings (Approximately)
            $table->decimal('cost_of_sales', 15, 2)->nullable(); // Cost of Sales
            $table->decimal('total_service_income', 15, 2)->nullable(); // Total Service Income
            $table->decimal('admin_cost_8000', 15, 2)->nullable(); // Admin Cost (8000) Estimated
            $table->decimal('total', 15, 2)->nullable(); // TOTAL
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('projects');
    }
};
