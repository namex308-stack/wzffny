<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Add billing columns used by Paddle subscription syncing.
     */
    public function up(): void
    {
        Schema::table('users', function (Blueprint $table) {
            // Store the active plan key (basic/pro/premium).
            $table->string('plan')->nullable()->after('password');
            // Mirror Paddle subscription status for quick access.
            $table->string('billing_status')->nullable()->after('plan');
            // Next renewal or cancellation effective date.
            $table->timestamp('current_period_end')->nullable()->after('billing_status');
        });
    }

    /**
     * Remove the billing columns.
     */
    public function down(): void
    {
        Schema::table('users', function (Blueprint $table) {
            $table->dropColumn(['plan', 'billing_status', 'current_period_end']);
        });
    }
};
