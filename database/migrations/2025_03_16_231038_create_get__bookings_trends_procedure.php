<?php


use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\DB;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        DB::unprepared("
        CREATE PROCEDURE GetBookingTrends()
           BEGIN
               SELECT 
                   DATE_FORMAT(created_at, '%Y-%m') AS month, 
                   COUNT(*) AS bookings
               FROM bookings
               WHERE status = 'completed'
               GROUP BY DATE_FORMAT(created_at, '%Y-%m') -- Group by created_at
               ORDER BY month;
           END 
        ");
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        DB::unprepared('DROP PROCEDURE IF EXISTS GetBookingTrends'); 
    }
};
