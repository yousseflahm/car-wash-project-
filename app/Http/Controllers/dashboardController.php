<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
// use App\Models\User;
use App\Models\Booking;
use App\Models\Service;
use Illuminate\Support\Facades\Auth;

class dashboardController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $user = Auth::user();

        $bookings = Booking::where('user_id', $user->id)->with(['car', 'services'])->get();
        
        $services = Service::all();
        
        return Inertia::render('Profile/Dashboard', [
            'bookings' => $bookings->map(function ($booking) {
                return [
                    'id_booking' => $booking->id,
                    'car' => $booking->car ? $booking->car->brand . ' ' . $booking->car->model : 'N/A',
                    'status' => $booking->status,
                    'services' => $booking->services->map(function ($service) {
                        return [
                            'id' => $service->id,
                            'name' => $service->name,
                            'description' => $service->description,
                            'price' => $service->price,
                        ];
                    }),
                ];
            }),
            'services' => $services->map(function ($service) {
                return [
                    'id' => $service->id,
                    'name' => $service->name,
                    'description' => $service->description,
                    'price' => $service->price,
                ];
            }),
        ]);
    }

}
