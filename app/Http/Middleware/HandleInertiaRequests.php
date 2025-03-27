<?php

namespace App\Http\Middleware;

use Illuminate\Http\Request;
use Inertia\Middleware;
use App\Models\Notification;
use Illuminate\Support\Facades\Auth;

class HandleInertiaRequests extends Middleware
{
    /**
     * The root template that is loaded on the first page visit.
     *
     * @var string
     */
    protected $rootView = 'app';

    /**
     * Determine the current asset version.
     */
    public function version(Request $request): ?string
    {
        return parent::version($request);
    }

    /**
     * Define the props that are shared by default.
     *
     * @return array<string, mixed>
     */
    public function share(Request $request): array
    {
        // Get the authenticated user and user type
        $user = null;
        $userType = null;

        if (Auth::guard('admin')->check()) {
            $user = Auth::guard('admin')->user(); 
            $userType = 'admin';
        } elseif (Auth::guard('washer')->check()) {
            $user = Auth::guard('washer')->user(); 
            $userType = 'washer'; 
        } else {
            $user = Auth::guard('web')->user(); 
            $userType = 'user'; 
        }

        return [
            ...parent::share($request),
            'auth' => [
                'user' => $user,
                'user_type' => $userType, 
            ],
            // Flash messages
            'flash' => [
                'success' => $request->session()->get('success'),
                'error' => $request->session()->get('error'),
                'warning' => $request->session()->get('warning'),
                'info' => $request->session()->get('info'),
                'status' => $request->session()->get('status'),
                'flashStatus' => $request->session()->get('flashStatus'),
            ],
            // Notifications
            'notifications' => fn () => $user
                ? Notification::where('user_id', $user->id)
                              ->where('user_type', $userType) 
                              ->where('is_read', false)
                              ->latest()
                              ->get()
                : [],
        ];
    }
}