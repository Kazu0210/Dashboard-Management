<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Employee extends Model
{
    protected $table = "employees";

    protected $fillable = [
        "first_name",
        "last_name",
        "email",
        "phone",
        "employment_type_id",
        "status_id",
        "monthly_salary",
        "attendance_rate",
        "date_hired",
        "date_resigned",
        "is_active",
    ];
    /**
     * Get the employment type for the employee.
     */
    public function employmentType()
    {
        return $this->belongsTo(\App\Models\EmploymentType::class, 'employment_type_id');
    }

    /**
     * Get the status for the employee.
     */
    public function status()
    {
        return $this->belongsTo(\App\Models\ProjectStatus::class, 'status_id');
    }
}
