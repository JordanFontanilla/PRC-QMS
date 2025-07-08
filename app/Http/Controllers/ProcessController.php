<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Process;
use App\Models\Department;
use Inertia\Inertia;

class ProcessController extends Controller
{
    public function index() {
        $processes = Process::with('departmentRelation')->orderBy('id', 'desc')->get()
        ->map(function ($process) {
            return [
                'id' => $process->id,
                'process_name' => $process->process_name,
                'department_id' => $process->department,
                'department_name' => $process->departmentRelation->department_name ?? 'N/A', // Use the relationship
            ];
        });

        $departments = Department::all();
        
      
      
        return Inertia::render('Admin/Processes', [
            'processes' => $processes,
            'departments' => $departments,
        ]);
    }

    public function store(Request $request){
        $validated = $request->validate([
            'process_name' => 'required|string|max:255',
            'department' => 'required|exists:departments,id'
        ]);

        Process::create([
            'process_name' => $validated['process_name'],
            'department' => $validated['department']
        ]);

        return redirect()->back()->with([
            'processes' => Process::orderBy('id', 'desc')->get()
        ]);
    }

    public function update(Request $request, $id){
        $processes = Process::FindOrFail($id);

        $validated = $request->validate([
            'process_name' => 'required|string|max:255',
            'department' => 'required|exists:departments,id'
        ]);

        $processes->update([
            'process_name' => $validated['process_name'],
            'department' => $validated['department']
        ]);

        $proceeses = Process::all();

        return redirect()->back()->with('processes', $processes);
    }
}
