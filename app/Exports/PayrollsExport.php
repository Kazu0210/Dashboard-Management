<?php

namespace App\Exports;

use App\Models\Payrolls;
use Maatwebsite\Excel\Concerns\FromCollection;
use Maatwebsite\Excel\Concerns\WithHeadings;
use Maatwebsite\Excel\Concerns\ShouldAutoSize;

class PayrollsExport implements FromCollection, WithHeadings, ShouldAutoSize
{
    public function collection()
    {
        return Payrolls::with('employee')
            ->get()
            ->map(function ($payroll) {
                return [
                    'Employee' => $payroll->employee ? $payroll->employee->first_name . ' ' . $payroll->employee->last_name : '',
                    'Pay Period Start' => $payroll->pay_period_start,
                    'Pay Period End' => $payroll->pay_period_end,
                    'Basic Salary' => $payroll->basic_salary,
                    'Allowances' => $payroll->allowances,
                    'Deductions' => $payroll->deductions,
                    'Net Pay' => $payroll->net_pay,
                    'Status' => $payroll->status,
                    'Paid At' => $payroll->paid_at,
                ];
            });
    }

    public function headings(): array
    {
        return [
            'Employee',
            'Pay Period Start',
            'Pay Period End',
            'Basic Salary',
            'Allowances',
            'Deductions',
            'Net Pay',
            'Status',
            'Paid At',
        ];
    }
}
