<?php

namespace App\Http\Controllers;

use App\Models\Washer;
use Illuminate\Http\Request;
use Inertia\Inertia;

class WasherController extends Controller
{
    

    public function getAllWashers()
    {

        $washers = Washer::all();

        return Inertia::render('admin/Profile/Washers' , ['washers' => $washers]);


    }
    public function updateStatus(Request $request, $id)
    {
        
        $request->validate([
            'status' => 'required|in:pending,approved,rejected',
        ]);

        
        $washer = Washer::findOrFail($id);
        $washer->status = $request->status;
        $washer->save();

         $message = 'Status updated successfully.';
         $flashStatus = $request->status;
        if ($request->status === 'approved') {

          
          $message = 'Washer has been approved successfully.';
        } elseif ($request->status === 'rejected') {

         
          $message = 'Washer has been rejected.';
        }

   
         return redirect()->route('admin.washers')->with(
            [
                'success'=> $message  ,
                'flashStatus' => $flashStatus
        ]);
    }

    public function deleteWasher($id)
    {
        $washer = Washer::findOrFail($id);
        $washer->delete();

        return redirect()->route('admin.washers')->with('success', 'Washer deleted successfully.');
    }


    
}
