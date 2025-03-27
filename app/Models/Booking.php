<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Booking extends Model
{
    use HasFactory;

    protected $table = 'bookings';
  

    protected $fillable = [ 'car_id', 'user_id', 'washer_id', 'status', 'date', 'total_price'];

    public function user()
    {
        return $this->belongsTo(User::class, 'user_id');
    }
    public function car()
    {
        return $this->belongsTo(Car::class, 'car_id');
    }

    public function washer()
    {
        return $this->belongsTo(Washer::class, 'washer_id');
    }

    public function services()
    {
        return $this->belongsToMany(Service::class, 'booking_service', 'booking_id', 'service_id')
            ->withPivot('quantity', 'price')
            ->withTimestamps();
    }
}
