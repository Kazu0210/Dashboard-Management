<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::dropIfExists('projects');
        Schema::create('projects', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->string('project_name', 255);
            $table->string('client', 255);
            $table->string('location', 255);
            $table->decimal('contract_amount', 15, 2);
            $table->string('duration', 50);
            $table->string('status', 50);
            $table->integer('personnel');
            $table->decimal('payroll', 15, 2);
            $table->decimal('supplies', 15, 2);
            $table->string('billing_status', 50);
            $table->decimal('collected', 15, 2);
            $table->decimal('net_income', 15, 2);
            $table->timestamp('created_at')->nullable();
            $table->timestamp('updated_at')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        //
    }
};
