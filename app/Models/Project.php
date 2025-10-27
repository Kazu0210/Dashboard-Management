<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Project extends Model
{
    use HasFactory;

    protected $fillable = [
        'project_name',
        'client',
        'location',
        'contract_amount',
        'duration',
        'status',
        'personnel',
        'payroll',
        'supplies',
        'billing_status',
        'collected',
        'net_income',
    ];
}
