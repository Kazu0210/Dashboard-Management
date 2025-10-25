<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Collection extends Model
{
    protected $table = "collections";

    protected $fillable = [
        'date',
        'project_id',
        'collector',
        'amount',
        'notes',
    ];
}
