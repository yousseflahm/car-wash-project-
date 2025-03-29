<?php

use App\Http\Controllers\admin\Auth\LoginController;

use App\Http\Controllers\admin\Auth\RegisteredController;
use App\Http\Middleware\AdminAuth;
use App\Http\Controllers\bookingController;
use App\Http\Controllers\AdminDashboardController;
use App\Http\Controllers\AdminProfileController;
use App\Http\Controllers\WasherController;
use App\Http\Controllers\ReviewController;
use App\Http\Controllers\ServiceController;
use Illuminate\Support\Facades\Route;

//  admin auth routes

Route::prefix('admin')->middleware('guest')->group(function () {
    Route::get('register', [RegisteredController::class, 'create']) ->name('admin.register');
    Route::post('register', [RegisteredController::class, 'store']);

    Route::get('login', [LoginController::class, 'create'])->name('admin.login');
    Route::post('login', [LoginController::class, 'store'])->name('admin.login.post');

});
  
//  admin dashboard routes

Route::prefix('admin')->middleware( 'auth:admin' ,  AdminAuth::class)->group(function () {
    Route::get('/dashboard', [AdminDashboardController::class, 'index'])->name('admin.dashboard');
    Route::post('logout', [LoginController::class, 'destroy'])->name('admin.logout');

    // booking handling routes
    Route::get('reservation' , [bookingController::class , 'getAllBookingAdmin'])->name('admin.reservation');
    Route::put('bookings/{id}/assign-washer', [BookingController::class, 'assignWasher'])->name('admin.addWasherToBooking');

    // washers handling routes  
    Route::get('Washers' , [WasherController::class , 'getAllWashers'])->name('admin.washers');
    Route::put('/washers/{id}/status', [WasherController::class, 'updateStatus'])->name('washers.updateStatus');
    Route::delete('/washers/{id}', [WasherController::class, 'deleteWasher'])->name('admin.washers.delete');

    //  reviews handling routes
    Route::get('reviews' , [ReviewController::class , 'getAllReviews'])->name('admin.reviews');

    // services handling routes

    Route::get('services' , [ServiceController::class , 'getAllServices'])->name('admin.services');
    Route::post('services' , [ServiceController::class , 'addNewService'])->name('admin.storeService');
    Route::post('services/{id}' , [ServiceController::class , 'deleteService'])->name('admin.deleteService');
});

//   profile routes
Route::middleware('auth:admin')->group(function () {
    Route::get('admin/profile', [AdminProfileController::class, 'edit'])->name('admin.profile.edit');
    Route::patch('admin/profile', [AdminProfileController::class, 'update'])->name('admin.profile.update');
    Route::delete('admin/profile', [AdminProfileController::class, 'destroy'])->name('admin.profile.destroy');
});
