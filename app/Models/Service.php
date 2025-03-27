<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Service extends Model
{
    use HasFactory;

    protected $table = 'services';
    protected $primaryKey = 'id_service';

    protected $fillable = ['created_by', 'name', 'description', 'price', 'duration'];

    public function admin()
    {
        return $this->belongsTo(Admin::class, 'created_by');
    }

    public function bookings()
    {
        return $this->belongsToMany(Booking::class, 'booking_service', 'service_id', 'booking_id')
            ->withPivot('quantity', 'price')
            ->withTimestamps();
    }
}
