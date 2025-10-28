<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('employees', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->string('first_name');
            $table->string('last_name');
            $table->string('email')->nullable();
            $table->string('phone')->nullable();
            $table->unsignedBigInteger('employment_type_id')->nullable();
            $table->unsignedBigInteger('status_id')->nullable();
            $table->date('date_hired')->nullable();
            $table->date('date_resigned')->nullable();
            $table->decimal('monthly_salary', 10, 2)->nullable();
            $table->decimal('attendance_rate', 5, 2)->nullable();
            $table->boolean('is_active')->default(true);
            $table->timestamps();

            $table->foreign('employment_type_id')->references('id')->on('employment_types')->onDelete('set null');
            $table->foreign('status_id')->references('id')->on('statuses')->onDelete('set null');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('employees');
    }
};
