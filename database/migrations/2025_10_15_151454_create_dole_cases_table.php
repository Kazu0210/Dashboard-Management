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
        Schema::create('dole_cases', function (Blueprint $table) {
            $table->id();
            $table->string('case_title')->unique();
            $table->string('filed_by');
            $table->date('case_date');
            $table->enum('status', ['open', 'investigating', 'resolved', 'closed'])->default('open');
            $table->text('details')->nullable();
            $table->date('resolution_date')->nullable();
            $table->string('assigned_personnel')->nullable();
            $table->text('remarks')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('dole_cases');
    }
};
