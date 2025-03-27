<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;



class Notification extends Model
{
    protected $fillable = [
        'user_id',
        'user_type',
        'message',
        'type',
        'is_read',
        'booking_id',
    ];

    // Relationship to user (client or washer)
    public function user()
    {
        return $this->morphTo();
    }
}