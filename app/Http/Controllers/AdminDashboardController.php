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
       // call procedure to get total revenue 
        $totalRevenueResult = DB::select('call getTotalRevenue()');
       
        $totalRevenue = $totalRevenueResult[0]->TotalRevenue  ?? 0;

        // get today revenue 
        $todayRevenueResult = DB::select('call get_today_revenue()');
     
        $todayRevenue = $todayRevenueResult[0]->TodayRevenue ?? 0;
         
        //  total users (client )
        $totalClients = User::count();
  
        //  get last month users
        $lastMonthClients = User::whereBetween('created_at', [
            Carbon::now()->subMonth()->startOfMonth(),  // start of last month
            Carbon::now()->subMonth()->endOfMonth(),    // end of last month 
        ])->count();

        // for calculate number of the precentage  
        $percentageSubscriptionFromLastMonth = ($totalClients > 0) ? ($lastMonthClients / $totalClients) * 100 : 0;

        // get 5 users that has 3 or more booking completed
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

        // getting to 5 services used by clients
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
