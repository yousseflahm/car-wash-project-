<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Booking;
use Illuminate\Support\Facades\Auth;

class WasherDashboardController extends Controller
{
    public function index()
    {

       $washerId = Auth::guard('washer')->id();

       $CurrentBookings = Booking::where('washer_id' , $washerId )->count();
       $PendingBookings = Booking::where('washer_id' , $washerId )->where('status' , 'pending')->count();
       $CompletedBookings = Booking::where('washer_id' , $washerId )->where('status' , 'completed')->count();


       $completedBookings = Booking::selectRaw('DAYOFWEEK(created_at) as day, COUNT(*) as count')
       ->where('washer_id', $washerId)
       ->where('status', 'completed')
       ->groupBy('day')
       ->orderBy('day')
       ->get();

   // Map the data to match the frontend format
   $chartData = collect(range(1, 7))->map(function ($day) use ($completedBookings) {
       $data = $completedBookings->firstWhere('day', $day);
       return [
           'day' => $day, // Day of the week (1 = Sunday, 2 = Monday, ..., 7 = Saturday)
           'completed' => $data ? $data->count : 0,
       ];
   });
        

        return Inertia::render('washer/Profile/Dashboard' , [
            'CurrentBookings' => $CurrentBookings,
            'PendingBookings' => $PendingBookings,
            'CompletedBookings' => $CompletedBookings,
            'chartData' => $chartData
        ]); 
    }
}
