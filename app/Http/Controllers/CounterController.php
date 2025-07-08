<?php

namespace App\Http\Controllers;

use App\Models\Counters;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Counter;
use App\Models\Department;
use App\Models\Process;
use Illuminate\Validation\Rule; // Add this import
class CounterController extends Controller
{
    // View method: Fetch all counters and return to an Inertia page
    public function index()
    {

        $counters = Counter::with('userRelation')->orderBy('id', 'desc')->get()
            ->map(function ($counter) {
                return [
                    'id' => $counter->id,
                    'counter_name' => $counter->counter_name,
                    'department_id' => $counter->department,
                    'user_name' => $counter->user_name,
                    'floor_assignment'=>$counter->floor_assignment
                ];
            });

        $processes = Process::all();
        $departments = Department::all();

        return Inertia::render('Admin/Counters', [
            'counters' => $counters,
            'departments' => $departments,
            'processes' => $processes,
        ]);
    }
    // Store method: Create a new counter record
    public function store(Request $request)
    {
        // Validate incoming request data
        $validated = $request->validate([
            'counter_name' => 'required|unique:counters,counter_name|uppercase',
            'floor_assignment' => 'required|string|max:255',
        ]);

        // Create and store new counter record
        $counter = Counter::create([
            'counter_name' => $validated['counter_name'],
            'floor_assignment' => $validated['floor_assignment'],
        ]);

        

        $counters = Counter::all();

        // Return Inertia response with updated counters list
        return redirect()->back()->with([
            'counters' => Counter::all(),
            'message' => 'Counter created successfully!'
        ]);
    }

    // Update method: Update an existing counter record
    public function update(Request $request, $id)
    {
        // Find the counter by ID
        $counter = Counter::findOrFail($id);

        // Validate incoming request data with unique check excluding current counter
        $validated = $request->validate([
            'counter_name' => [
                'required',
                'string',
                'max:255',
                Rule::unique('counters')->ignore($counter->id),
            ],
            'floor_assignment' => [
                'required',
                'string',
                'max:255',
            ]
        ]);

        // Update the counter with the validated data
        $counter->update([
            'counter_name' => $validated['counter_name'],
            'floor_assignment' => $validated['floor_assignment']

        ]);

        // Return updated counters list with success message
        return redirect()
            ->back()
            ->with('success', 'Counter updated successfully')
            ->with('counters', Counter::all());
    }

    // Delete method: Delete a counter record
    public function destroy($id)
    {
        // Find the counter by ID and delete it
        $counter = Counter::findOrFail($id);
        $counter->delete();

        // Redirect to the counters page with success message
        return redirect()->route('admin.counters')->with('success', 'Counter deleted successfully.');
    }
}
