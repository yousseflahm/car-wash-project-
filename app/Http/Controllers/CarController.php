<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;
use App\Models\Car; // Ensure that the Car model exists in this namespace

class CarController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $userid = Auth::id();

        $Cars = Car::where("user_id" , $userid )->get();

        return Inertia::render('Profile/MangeCar', [
            'cars' => $Cars
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
         return Inertia::render('Profile/MangeCar' , [
           'cars' => Car::where("user_id" , Auth::id() )->get() ,  
        ]); 
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'brand' => 'required|string|max:255|min:3',
            'model' => 'required|string|max:255|min:3',
        ]);

     

        $Car =  Car::create([
            'user_id' => $request->user_id,
            'brand' => $request->brand,
            'model' => $request->model,
        ]);

        $Cars = Car::all();

        return  redirect()->route('MangeCar')->with('success', 'Car created successfully');

       
    }
    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        $car = Car::find($id);
        return inertia('Profile/MangeCarEdit', [
            'car' => $car,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $request->validate([
            'brand' => 'required|string|max:255|min:3',
            'model' => 'required|string|max:255|min:3',
        ]);

        $car = Car::find($id);
        $car->update([
            'brand' => $request->brand,
            'model' => $request->model,
        ]);
        return redirect()->route('MangeCar')->with('success', 'Car updated successfully');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {

        $car = Car::find($id);
        
        $car->delete();

        return redirect()->route('MangeCar')->with('success', 'Car deleted successfully');

    }
}
