<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Monitor;
use App\Models\Department;
use Inertia\Inertia;

class MonitorController extends Controller
{
    public function index()
    {
        $monitors = Monitor::orderBy('id', 'desc')->get();
        $departments = Department::all();
        return Inertia::render('Admin/Monitors', [
            'monitors' => $monitors,
            'departments' => $departments
        ]);
    }

    // Store method: Create a new counter records
    public function store(Request $request)
    {
        $validated = $request->validate([
            'monitor_name' => 'required|string|max:255',
        ]);

        Monitor::create([
            'monitor_name' => $validated['monitor_name'],
        ]);

        // Return the updated departments list
        return redirect()->back()->with([
            'monitors' => Monitor::orderBy('id', 'desc')->get()
        ]);
    }

    // Update method: Update an existing counter record
    public function update(Request $request, $id)
    {
        // Find the counter by ID
        $monitors = Monitor::findOrFail($id);

        // Validate incoming request data
        $validated = $request->validate([
            'monitor_name' => 'required|string|max:255',

        ]);

        // Update the monitors with the validated data
        $monitors->update(
            [

                'monitor_name' => $validated['monitor_name']
            ]
        );

        // Redirect to the departmentss page with success message

        $monitors = Monitor::all();

        return redirect()->back()->with('monitors', $monitors); // ✅ Ensure new counter is returned
    }

    // Delete method: Delete a counter record
    public function destroy($id)
    {
        // Find the counter by ID and delete it
        $monitor = Monitor::findOrFail($id);
        $monitor->delete();

        // Redirect to the monitors page with success message
        return redirect()->route('admin.monitors')->with('success', 'Counter deleted successfully.');
    }
}
