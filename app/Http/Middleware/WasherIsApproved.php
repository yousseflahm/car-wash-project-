<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Symfony\Component\HttpFoundation\Response;

class WasherIsApproved
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        $washer = Auth::guard('washer')->user();

       
        if ($washer && $washer->status !== 'approved') {
            Auth::guard('washer')->logout(); // Log out the washer
            return redirect()->route('washer.login')->withErrors([
                'email' => 'You are not approved yet.',
            ]);
        }

        return $next($request);
    }
}
