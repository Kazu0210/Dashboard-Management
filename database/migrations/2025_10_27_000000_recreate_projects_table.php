<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::dropIfExists('projects');
        Schema::create('projects', function (Blueprint $table) {
            $table->id();
            $table->string('project_name');
            $table->string('client');
            $table->string('location');
            $table->decimal('contract_amount', 15, 2);
            $table->string('duration');
            $table->string('status');
            $table->integer('personnel');
            $table->decimal('payroll', 15, 2);
            $table->decimal('supplies', 15, 2);
            $table->string('billing_status');
            $table->decimal('collected', 15, 2);
            $table->decimal('net_income', 15, 2);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('projects');
    }
};
