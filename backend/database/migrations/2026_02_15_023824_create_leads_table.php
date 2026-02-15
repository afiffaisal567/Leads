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
        Schema::create('leads', function (Blueprint $table) {
            $table->id();
            $table->string('nama');
            $table->string('nomor_whatsapp', 20);
            $table->string('email');
            $table->string('nama_lembaga');
            $table->timestamps();
            $table->softDeletes();

            $table->index('nama');
            $table->index('email');
            $table->index('nama_lembaga');
            $table->index('created_at');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('leads');
    }
};