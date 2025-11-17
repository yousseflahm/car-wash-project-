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
        // Total revenue
        $totalRevenueResult = DB::select('call getTotalRevenue()');
        $totalRevenue = $totalRevenueResult[0]->TotalRevenue ?? 0;
    
        // Today revenue
        $todayRevenueResult = DB::select('call get_today_revenue()');
        $todayRevenue = $todayRevenueResult[0]->TodayRevenue ?? 0;
    
        // Total clients
        $totalClients = User::count();
    
        // Last month clients
        $lastMonthClients = User::whereBetween('created_at', [
            Carbon::now()->subMonth()->startOfMonth(),
            Carbon::now()->subMonth()->endOfMonth(),
        ])->count();
    
        $percentageSubscriptionFromLastMonth =
            ($totalClients > 0) ? ($lastMonthClients / $totalClients) * 100 : 0;
    
        // Top users
        $topUsers = User::whereHas('bookings', fn($q) => $q->where('status', 'completed'))
            ->withCount(['bookings as total_bookings' => fn($q) => $q->where('status', 'completed')])
            ->having('total_bookings', '>', 3)
            ->orderByDesc('total_bookings')
            ->limit(5)
            ->get()
            ->toArray();   // ← FIX
    
        // Top services
        $topServices = Service::withCount(['bookings as total_bookings' => fn($q) => $q->where('status', 'completed')])
            ->orderByDesc('total_bookings')
            ->limit(5)
            ->get()
            ->toArray();   // ← FIX
    
        // Booking trends
        $bookingTrendsResult = DB::select('call GetBookingTrends()');
        $bookingTrends = collect($bookingTrendsResult)->map(fn($i) => [
            'month' => $i->month,
            'bookings' => $i->bookings,
        ])->toArray();   // ← FIX
    
        return Inertia::render('admin/Profile/Dashboard', [
            'totalRevenue' => $totalRevenue,
            'todayRevenue' => $todayRevenue,
            'totalClients' => $totalClients,
            'percentageClientLastMonth' => $percentageSubscriptionFromLastMonth,
            'bookingTrends' => $bookingTrends,
            'topUsers' => $topUsers,
            'topServices' => $topServices,
        ]);
    }
    
}
