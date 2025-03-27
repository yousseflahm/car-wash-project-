<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;
use App\Models\Booking;
use Barryvdh\DomPDF\Facade\Pdf;



class BookingInvoiceController extends Controller
{
     //

     public function index()
     {
        $ClientId = Auth::id();

        $bookingsCompleted  = Booking::where('user_id' , $ClientId)->where('status' , 'completed')->with(['car' , 'services'])->get();
        
        return  Inertia::render('Profile/BookingInvoice' , [
            "bookingsCompleted" => $bookingsCompleted->map(function($booking){
                return [
                    'id' => $booking->id,
                    'car' => $booking->car ? $booking->car->brand . ' ' . $booking->car->model : 'N/A',
                    'status' => $booking->status,
                    'services' => $booking->services->map(function($service){
                        return [
                            'id' => $service->id,
                            'name' => $service->name,
                            'price' => $service->price,
                        ];
                    }),
                ];
            }),
        ]); ;
     }

     public function generateInvoicePdf($id)
{
    // Fetch the specific booking with the given ID
    $booking = Booking::where('id', $id)
        ->where('status', 'completed')
        ->with(['car', 'services', 'washer']) // Include the washer relationship
        ->firstOrFail();
 
    // Format the booking data
    $bookingData = [
        'id' => $booking->id,
        'car' => $booking->car ? $booking->car->brand . ' ' . $booking->car->model : 'N/A',
        'status' => $booking->status,
        'created_at' => $booking->created_at->format('Y-m-d H:i:s'), // Format the timestamp
        'washer_name' => $booking->washer ? $booking->washer->name : 'N/A', // Get washer name
        'services' => $booking->services->map(function ($service) {
            return [
                'id' => $service->id,
                'name' => $service->name,
                'price' => $service->price,
            ];
        }),
    ];

    $totalPrice = $booking->services->sum('price'); // Calculate the total price

    // Generate the PDF
    $pdf = Pdf::loadView('pdf.invoice', [
        'booking' => $bookingData, // Pass the single booking data
        'totalPrice' => $totalPrice, // Pass the total price
    ]);

    // Download the PDF
    return $pdf->download("booking_invoice_{$booking->id}.pdf");
}
}
