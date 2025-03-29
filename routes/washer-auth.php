<?php

use App\Http\Controllers\BookingController;
use App\Http\Controllers\washer\Auth\AuthenticatedSessionController;
use App\Http\Controllers\washer\Auth\ConfirmablePasswordController;
use App\Http\Controllers\washer\Auth\EmailVerificationNotificationController;
use App\Http\Controllers\washer\Auth\EmailVerificationPromptController;
use App\Http\Controllers\washer\Auth\NewPasswordController;
use App\Http\Controllers\washer\Auth\PasswordController;
use App\Http\Controllers\washer\Auth\PasswordResetLinkController;
use App\Http\Controllers\washer\Auth\RegisteredUserController;
use App\Http\Controllers\washer\Auth\VerifyEmailController;
use App\Http\Controllers\WasherDashboardController;
use App\Http\Controllers\NotificationController;
use App\Http\Controllers\WasherProfileController;
use App\Http\Middleware\WasherAuth;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;


Route::prefix('/washer')->middleware('guest')->group(function () {
    Route::get('register', [RegisteredUserController::class, 'create'])->name('washer.register');
    Route::post('register', [RegisteredUserController::class, 'store']);

    Route::get('login', [AuthenticatedSessionController::class, 'create'])->name('washer.login');
    Route::post('login', [AuthenticatedSessionController::class, 'store'])->name('washer.login.post');

    Route::get('forgot-password', [PasswordResetLinkController::class, 'create']) ->name('washer.password.request');
    Route::post('forgot-password', [PasswordResetLinkController::class, 'store'])->name('washer.password.email');

    Route::get('reset-password/{token}', [NewPasswordController::class, 'create'])->name('washer.password.reset');
    Route::post('reset-password', [NewPasswordController::class, 'store']) ->name('washer.password.store');
});

Route::prefix('washer')->middleware('auth:washer' , WasherAuth::class , 'washer.approved')->group(function () {
    Route::get('verify-email', EmailVerificationPromptController::class)->name('washer.verification.notice');
    Route::get('verify-email/{id}/{hash}', VerifyEmailController::class)
        ->middleware(['signed', 'throttle:6,1'])
        ->name('washer.verification.verify');

    Route::post('email/verification-notification', [EmailVerificationNotificationController::class, 'store'])
        ->middleware('throttle:6,1')
        ->name('washer.verification.send');

    Route::get('confirm-password', [ConfirmablePasswordController::class, 'show'])
        ->name('washer.password.confirm');

    Route::post('confirm-password', [ConfirmablePasswordController::class, 'store']);

    Route::put('password', [PasswordController::class, 'update'])->name('washer.password.update');

    Route::post('logout', [AuthenticatedSessionController::class, 'destroy'])
        ->name('washer.logout');

    Route::get('dashboard', [WasherDashboardController::class, 'index']  )->middleware(['auth:washer', 'verified'])->name('washer.dashboard');

    //  routes for handling booking in washer dashboard 
    Route::get('MangeBooking' , [BookingController::class , 'getBookingPageWasher'])->name('washer.getBookingPageWasher');
    Route::put('MangeBooking/{id}' , [BookingController::class , 'updateBookingStatus'])->name('washer.updateBookingStatus') ;


    // notifications
    Route::post('/notifications/mark-as-read/{id}', [NotificationController::class, 'markAsRead'])->middleware(['auth', 'verified'])->name('washer.notifications.markAsRead');

    // Mark all notifications as read
    Route::post('/notifications/mark-all-as-read', [NotificationController::class, 'markAllAsRead'])->middleware(['auth', 'verified'])->name('washer.notifications.markAllAsRead');
    
});




Route::middleware('auth:washer')->group(function () {
    Route::get('washer/profile', [WasherProfileController::class, 'edit'])->name('washer.profile.edit');
    Route::patch('washer/profile', [WasherProfileController::class, 'update'])->name('washer.profile.update');
    Route::delete('washer/profile', [WasherProfileController::class, 'destroy'])->name('washer.profile.destroy');
});


