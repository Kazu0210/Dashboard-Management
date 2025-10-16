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
        "position",
        "hired_at",
        "salary",
        "employment_type_id",
        "status",
    ];
}
