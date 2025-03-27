<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Review;

class ReviewController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
      
       return Inertia::render('Profile/ReviewPage', [
            'reviews' => Review::all()
        ]);
        

    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
       return Inertia::render('Profile/ReviewPage');   
    
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
           
       $request->validate([
            'rating' => 'required',
            'comment' => 'required|string|max:255',
        ]);

        Review::create([
            'user_id' => $request->user_id,
            'rating' => $request->rating,
            'comment' => $request->comment,
        ]);

        return redirect()->route('ReviewPage')
            ->with('success', 'Review created successfully.');


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
        //
    }

    public function getAllReviews()
    {
        $reviews = Review::with('user')->get();
        
        return Inertia::render('admin/Profile/Reviews', [
            'reviews' => $reviews->map(function ($review) {
                return [
                    'id_review' => $review->id_review, 
                    'user_id' => $review->user_id,
                    'rating' => $review->rating,
                    'comment' => $review->comment,
                    'created_at' => $review->created_at,
                    'user_name' => $review->user->name, 
                ];
            })
        ]);
    }
}
