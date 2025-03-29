<?php

use App\Http\Controllers\CarController;
use App\Http\Controllers\ContactController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\ReviewController;
use App\Http\Controllers\BookingController;
use App\Http\Controllers\BookingInvoiceController;
use Illuminate\Foundation\Application;
use App\Http\Controllers\dashboardController;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\NotificationController;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Accueil', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::get('/washer-landing', function () {
    return Inertia::render('WasherAccueil', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
})->name('washer-landing');


// routes for the client pages 
// dashboard

Route::get('/client/dashboard', [dashboardController::class, 'index'])->middleware(['auth', 'verified'])->name('dashboard');   

// booking
Route::get("/client/booking" , [BookingController::class , "index"])->middleware(['auth', 'verified'])->name('BookingPage') ;
Route::post("/client/booking" , [BookingController::class , "store"])->middleware(['auth', 'verified'])->name('BookingPage.store') ;
Route::delete("/client/booking/{id}" , [BookingController::class , "destroy"])->middleware(['auth', 'verified'])->name('BookingPage.destroy') ;
;

// mange car  routes
Route::get("/client/MangeCar" , [CarController::class , "create"])->middleware(['auth', 'verified'])->name('MangeCar') ;
Route::post("/client/MangeCar" , [CarController::class , "store"])->middleware(['auth', 'verified'])->name('MangeCar.store') ;
Route::get('/MangeCar/{car}/edit', [CarController::class, 'edit'])->name('MangeCar.edit');
Route::put('/MangeCar/{car}', [CarController::class, 'update'])->name('MangeCar.update');
Route::delete('/MangeCar/{car}', [CarController::class, 'destroy'])->name('MangeCar.destroy');




// client review routes 
Route::get("/client/ReviewPage" , [ReviewController::class , "create"])->middleware(['auth', 'verified'])->name('ReviewPage') ;
Route::post("/client/ReviewPage" , [ReviewController::class , "store"])->middleware(['auth', 'verified'])->name('ReviewPage.post') ;



// documents
Route::get("/client/booking-invoice" , [BookingInvoiceController::class , "index"])->middleware(['auth', 'verified'])->name('BookingInvoicePage') ;
Route::get("/client/booking-invoice/{id}" , [BookingInvoiceController::class , "generateInvoicePdf"])
->middleware(['auth', 'verified'])->name('generateInvoicePdf') ;

// notifications
Route::post('/notifications/mark-as-read/{id}', [NotificationController::class, 'markAsRead'])
    ->middleware(['auth', 'verified'])
    ->name('notifications.markAsRead');

// Mark all notifications as read
Route::post('/notifications/mark-all-as-read', [NotificationController::class, 'markAllAsRead'])
    ->middleware(['auth', 'verified'])
    ->name('notifications.markAllAsRead');
//   profile routes
Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});
//   auth routes
require __DIR__.'/auth.php';
require __DIR__.'/admin-auth.php';
require __DIR__.'/washer-auth.php';



// contact us routes
Route::post("/contact"  , [ContactController::class , 'store']) ; 




