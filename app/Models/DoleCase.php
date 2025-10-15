<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class DoleCase extends Model
{
    use HasFactory;

    protected $fillable = [
        'case_title',
        'filed_by',
        'case_date',
        'status',
        'details',
        'resolution_date',
        'assigned_personnel',
        'remarks',
    ];
}
