<?php

namespace App\Http\Controllers\washer\Auth;

use App\Http\Controllers\Controller;

use App\Models\Washer;
use Illuminate\Auth\Events\Registered;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rules;
use Inertia\Inertia;
use Inertia\Response;

class RegisteredUserController extends Controller
{
    /**
     * Display the registration view.
     */
    public function create(): Response
    {
        return Inertia::render('washer/Auth/Register');
    }

    /**
     * Handle an incoming registration request.
     *
     * @throws \Illuminate\Validation\ValidationException
     */
    public function store(Request $request): RedirectResponse
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'lastName' => 'required|string|max:255',
            'phone' => 'required|string|max:255|regex:/^0[5-7]{1}[0-9]{8}$/',
            'address' => 'required|string|max:255',
            'email' => 'required|string|lowercase|email|max:255|unique:'.Washer::class,
            'password' => ['required', 'confirmed', Rules\Password::defaults()],
            'phone' => 'required|string',
        ]);

        $washer = Washer::create([
            'name' => $request->name,
            'lastName' => $request->lastName,
            'phone' => $request->phone,
            'address' => $request->address,
            'email' => $request->email,
            'password' => Hash::make($request->password),
            'phone' => $request->phone ,
        ]);

        event(new Registered($washer));
        
        Auth::guard('washer')->login($washer);

        return redirect(route('washer.dashboard', absolute: false));
    }
}
