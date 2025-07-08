<?php

namespace App\Http\Controllers;

use App\Models\Department;
use Illuminate\Http\Request;
use Inertia\Inertia;


class DepartmentController extends Controller
{
    // View method: Fetch all counters and return to an Inertia page
    public function index()
    {
        $departments = Department::orderBy('id', 'desc')->get();

        return Inertia::render('Admin/Departments', [
            'departments' => $departments,
        ]);
    }

    // Store method: Create a new counter record
    public function store(Request $request)
    {
        $validated = $request->validate([
            'department_name' => 'required|string|max:255',
        ]);
    
        Department::create([
            'department_name' => $validated['department_name'],
        ]);
    
        // Return the updated departments list
        return redirect()->back()->with([
            'departments' => Department::orderBy('id', 'desc')->get()
        ]);
    }

    // Update method: Update an existing counter record
    public function update(Request $request, $id)
    {
        // Find the counter by ID
        $departments = Department::findOrFail($id);

        // Validate incoming request data
        $validated = $request->validate([
            'department_name' => 'required|string|max:255',
         
        ]);
     
        // Update the departments with the validated data
        $departments->update(
            [
                
                'department_name' => $validated['department_name']
            ]
        );

        // Redirect to the departmentss page with success message

        $departments = Department::all();

        return redirect()->back()->with('departmentss', $departments); // ✅ Ensure new counter is returned
    }

    // Delete method: Delete a counter record
    public function destroy($id)
    {
        // Find the counter by ID and delete it
        $counter = Department::findOrFail($id);
        $counter->delete();

        // Redirect to the counters page with success message
        return redirect()->route('admin.counters')->with('success', 'Counter deleted successfully.');
    }
}
