<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('users', function (Blueprint $table) {
            $table->uuid('public_uid')->unique()->nullable()->after('id');
        });

        Schema::table('groups', function (Blueprint $table) {
            $table->uuid('public_uid')->unique()->nullable()->after('id');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('users', function (Blueprint $table) {
            $table->dropColumn('public_uid');
        });

        Schema::table('groups', function (Blueprint $table) {
            $table->dropColumn('public_uid');
        });
    }
};
