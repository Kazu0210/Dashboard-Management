<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Payrolls extends Model
{
    protected $fillable = [
        'employee_id',
        'pay_period_start',
        'pay_period_end',
        'basic_salary',
        'allowances',
        'deductions',
        'net_pay',
        'status',
        'paid_at',
    ];

    /**
     * Get the employee that owns the payroll record.
     */
    public function employee()
    {
        return $this->belongsTo(Employee::class);
    }
}
