<?php

use Illuminate\Database\Migrations\Migration;

use Illuminate\Support\Facades\DB;


return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up()
    {
       
        DB::statement('
        CREATE TRIGGER after_booking_status_update
        AFTER UPDATE ON bookings
        FOR EACH ROW
        BEGIN
            IF OLD.status <> NEW.status THEN
                INSERT INTO notifications (user_id, user_type, message, type, booking_id, created_at)
                VALUES (
                    NEW.user_id, 
                    "user", 
                    CONCAT("Your booking status has been updated to: ", NEW.status),
                    "booking_update",
                    NEW.id,
                    NOW() 
                );
            END IF;
        END
    ');

        
        DB::statement('
            CREATE TRIGGER after_booking_assigned
            AFTER UPDATE ON bookings
            FOR EACH ROW
            BEGIN
                IF OLD.washer_id IS NULL AND NEW.washer_id IS NOT NULL THEN
                    INSERT INTO notifications (user_id, user_type, message, type, booking_id , created_at)
                    VALUES (
                        NEW.washer_id,
                        "washer", 
                        "A new booking has been assigned to you.",
                        "assigned_booking",
                        NEW.id ,
                        NOW()
                    );
                END IF;
            END
        ');
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        // Drop the triggers when rolling back the migration
        DB::statement('DROP TRIGGER IF EXISTS after_booking_status_update');
        DB::statement('DROP TRIGGER IF EXISTS after_booking_assigned');
    }
};
