<?php

namespace App\Http\Controllers;

use App\Models\Contact;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ContactController extends Controller
{
  

    public function store(Request $request){


        // dd($request) ;

        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|unique:contacts',
            'text' => 'required|string',
        ]);

         Contact::create([
            'name' => $request->name ,
            'email' => $request->email ,
            'text' => $request->text 
        ]) ;


        
        return Inertia::render('Accueil', [
            'success' => 'Form was sent successfully!'
        ]);
         
    }
}
