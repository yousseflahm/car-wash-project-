<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Models\User;
use App\Models\Service;
use Carbon\Carbon;
use Inertia\Inertia;

class AdminDashboardController extends Controller
{
    public function index()
    {
       // Call the procedure to get total revenue
        $totalRevenueResult = DB::select('call getTotalRevenue()');
        $totalRevenue = $totalRevenueResult[0]->TotalRevenue  ?? 0;

        // Call the procedure to get today's revenue
        $todayRevenueResult = DB::select('call get_today_revenue()');
        $todayRevenue = $todayRevenueResult[0]->TodayRevenue ?? 0;
         
        //  Get the total number of users
        $totalClients = User::count();
  
        // Get the number of users who registered last month
        $lastMonthClients = User::whereBetween('created_at', [
            Carbon::now()->subMonth()->startOfMonth(),  // Start of last month
            Carbon::now()->subMonth()->endOfMonth(),    // End of last month
        ])->count();

        // Calculate the percentage of users who registered last month
        $percentageSubscriptionFromLastMonth = ($totalClients > 0) ? ($lastMonthClients / $totalClients) * 100 : 0;

        // Get the top 5 users with the most bookings
        $topUsers = User::whereHas('bookings', function ($query) {
            $query->where('status', 'completed');
        })
        ->withCount(['bookings as total_bookings' => function ($query) {
            $query->where('status', 'completed');
        }])
        ->having('total_bookings', '>', 3)
        ->orderByDesc('total_bookings')
        ->limit(5)
        ->get();

        // Get the top 5 services with the most bookings
        $topServices = Service::withCount(['bookings as total_bookings' => function ($query) {
            $query->where('status', 'completed');
        }])
        ->orderByDesc('total_bookings')
        ->limit(5)
        ->get();

        $bookingTrendsResult = DB::select('call GetBookingTrends()');
        $bookingTrends = collect($bookingTrendsResult)->map(function ($item) {
            return [
                   'month' => $item->month,
                   'bookings' => $item->bookings,
               ];
           });


       
        return Inertia::render('admin/Profile/Dashboard', [
            'totalRevenue' => $totalRevenue ,
            'todayRevenue' => $todayRevenue ,
            'totalClients' => $totalClients , 
            'percentageClientLastMonth' => $percentageSubscriptionFromLastMonth , 
            'bookingTrends' => $bookingTrends,
            'topUsers' => $topUsers,
            'topServices' => $topServices, 
        ]);
    }
}
