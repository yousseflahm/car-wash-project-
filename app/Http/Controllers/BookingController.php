<?php

namespace App\Http\Controllers;
use App\Models\Booking;
use App\Models\Car;
use App\Models\Service;
use App\Models\Washer;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Illuminate\Http\Request;

class BookingController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {

     $userid = Auth::id();
        
     $bookings = Booking::with(['car' , 'services' , 'washer'])->where('user_id' , $userid )->get(); 

    return Inertia::render('Profile/Booking', [
        'bookings' => $bookings->map(function ($booking) {
            return [
                'id_booking' => $booking->id,
                'car' => $booking->car ? $booking->car->brand . ' ' . $booking->car->model : 'N/A', 
                'washer_name' => $booking->washer_id ? $booking->washer->name : 'N/A',
                'status' => $booking->status,
                'date' => $booking->date,
                'total_price' => $booking->total_price,
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
        'cars' => Car::where('user_id' , $userid )->get(), 
        'services' => Service::all(), 
    ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {

        
        return redirect()->route('BookingPage');
        


        
       
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
       $request->validate([
        'car_id' => 'required|exists:cars,id',
        'service_ids' => 'required|array',
        'service_ids.*' => 'exists:services,id_service',
        'total_price' => 'required|numeric',
    ]);

    
    $booking = Booking::create([
        'user_id' => Auth::id(),
        'car_id' => $request->car_id,
        'status' => 'pending',
        'date' => now()->toDateString(), 
        'total_price' => $request->total_price,
    ]);

   
    foreach ($request->service_ids as $serviceId) {
        $service = Service::find($serviceId);
        $booking->services()->attach($serviceId, [
            'quantity' => 1, 
            'price' => $service->price, 
        ]);
    }

    return redirect()->route('BookingPage')->with('success', 'Booking created successfully.');
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {  
        $booking = Booking::findOrFail($id);
        $booking->delete();
        return redirect()->route('BookingPage')->with('success', 'Booking deleted successfully.');
    }


    public function getAllBookingAdmin(){
         
        $bookings = Booking::with(['user', 'car', 'services'])->get();
        $approvedWashers = Washer::where('status', 'approved')->get();
        
        return Inertia::render('admin/Profile/AllBooking', [
            'bookings' => $bookings->map(function ($booking) {
                return [
                    'id_booking' => $booking->id,
                    'user' => $booking->user ? $booking->user->name : 'N/A', 
                    'car' => $booking->car ? $booking->car->brand . ' ' . $booking->car->model : 'N/A', 
                    'washer_id' => $booking->washer_id,
                    'status' => $booking->status,
                    'date' => $booking->date,
                    'total_price' => $booking->total_price,
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
            'cars' => Car::all(), 
            'services' => Service::all(), 
            'washers' => $approvedWashers, 
        ]);
    }

    public function assignWasher(Request $request, string $id)
    {
        $request->validate([
            'washer_id' => 'required|exists:washers,id',
        ]);

        $booking = Booking::findOrFail($id);
        $booking->update([
            'washer_id' => $request->washer_id,
           
        ]);

        return redirect()->route('admin.reservation')->with('success', 'Washer assigned successfully.');
    }


    public function getBookingPageWasher (){

        $bookings = Booking::with(['car' , 'services' , 'washer' , 'user' ])
        ->where('washer_id', Auth::id()) 
        ->where('washer_id' , Auth::id())->get(); 

        return Inertia::render('washer/Profile/MangeBooking', [
           'bookings' => $bookings->map(function ($booking) {
               return [
              'id_booking' => $booking->id,
              'car' => $booking->car ? $booking->car->brand . ' ' . $booking->car->model : 'N/A',
              'user_name' => $booking->user ? $booking->user->name : 'N/A', // Add user name
              'status' => $booking->status,
              'date' => $booking->date,
              'total_price' => $booking->total_price,
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
            
             
        ]);
    }

    public function updateBookingStatus(Request $request , $id){
        $request->validate([
            'status' => 'required|in:pending,confirmed,processing,completed,canceled',
        ]);
    
         
        // dd($request) ;
        $booking = Booking::findOrFail($id);
    
      
        $booking->status = $request->status;
        $booking->save();
    
       
        return redirect()->route('washer.getBookingPageWasher')->with('success', 'booking status updated successfully');

    }
}
