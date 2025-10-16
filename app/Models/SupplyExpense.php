<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class SupplyExpense extends Model
{
    protected $fillable = [
        'category',
        'description',
        'amount',
        'expense_date',
        'created_by',
    ];

    protected $casts = [
        'expense_date' => 'date',
        'amount' => 'decimal:2',
    ];
}
