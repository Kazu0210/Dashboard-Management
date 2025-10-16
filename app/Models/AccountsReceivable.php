<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class AccountsReceivable extends Model
{
    protected $fillable = [
        'client_id', 'invoice_no', 'amount', 'balance',
        'invoice_date', 'due_date', 'status'
    ];

    public function payments()
    {
        return $this->hasMany(Payments::class);
    }
}
