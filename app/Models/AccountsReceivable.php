<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class AccountsReceivable extends Model
{
    protected $table = 'accounts_receivable';
    protected $fillable = [
        'client_id', 'invoice_no', 'amount', 'balance',
        'invoice_date', 'due_date', 'status'
    ];

    public function payments()
    {
        return $this->hasMany(Payments::class);
    }

    public function client()
    {
        return $this->belongsTo(Client::class);
    }
}
