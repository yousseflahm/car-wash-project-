<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Service;
use Inertia\Inertia;

class ServiceController extends Controller
{
    //

    public function getAllServices()
    {
        $services = Service::all();
        return Inertia::render('admin/Profile/Services' , ['services' => $services]);

    }

    public function addNewService(Request $request)
    {
        $request->validate([
            'name' => 'required|string',
            'price' => 'required|numeric',
            'description' => 'required|string',
        ]);

        $service = new Service();
        $service->created_by = auth()->guard('admin')->user()->id;
        $service->name = $request->name;
        $service->price = $request->price;
        $service->description = $request->description;
        $service->save();

        return $this->getAllServices()->with('success' , 'Service added successfully');
    }

    public function deleteService($id)
    {
        $service = Service::find($id);
        $service->delete();
        return redirect()->back()->with('success' , 'Service deleted successfully');
    }   
}
