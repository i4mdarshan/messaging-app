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
        Schema::create('groups', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->longText('description')->nullable();
            $table->foreignId('owner_id')->constrained('users')->onDelete('cascade');
            $table->timestamps();
        });

        Schema::create('groups_users', function (Blueprint $table) {
            $table->id();
            $table->foreignId('groups_id')->constrained('groups')->onDelete('cascade');
            $table->foreignId('user_id')->constrained('users')->onDelete('cascade');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('groups_users');
        Schema::dropIfExists('groups');
    }
};
