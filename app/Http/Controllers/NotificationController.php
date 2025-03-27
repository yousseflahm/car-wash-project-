<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Notification;
use Illuminate\Support\Facades\Auth;

class NotificationController extends Controller
{
    public function markAsRead(Request $request , $id)
    {
        
        $notification = Notification::find($id);
         
        if ($notification) {
            $notification->update(['is_read' => true]);
        }

        return redirect()->back();
    }

    // Mark all notifications as read
    public function markAllAsRead(Request $request)
    {
        $user = Auth::user(); // Get the authenticated model instance

        Notification::where('user_type', get_class($user))
                ->where('user_id', $user->id)
                ->update(['is_read' => true]);

        return redirect()->back();
    }
}
