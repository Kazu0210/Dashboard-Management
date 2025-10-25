<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Models\Project;

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

    public function project()
    {
        return $this->belongsTo(Project::class, 'project_id');
    }
}
