<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use inertia\Inertia;
use App\Models\Process;
use App\Models\Queue;
use Carbon\Carbon;
use App\Events\UpdateQueueTable;
class ServiceAssignmentController extends Controller
{
    public function index()
    {

        $processes = Process::all();

        return Inertia::render('Receptionist/ServiceAssignments', ['processes' => $processes]);
    }

    public function generateQueueTicket(Request $request)
    {
        $today = now()->format('Ymd'); // 20250408
        $prefix = "{$today}";

        // Count how many tickets were issued today
        $countToday = Queue::whereDate('created_at', now())->count() + 1;

        // Pad the counter to 3 digits
        $counter = str_pad($countToday, 3, '0', STR_PAD_LEFT);

        // Final ticket number
        $ticketNumber = "{$prefix}-{$counter}";


        return response()->json([
            'ticket' => $ticketNumber,
        ]);
    }

    public function store(Request $request)
    {
        $queue = $request->all();


        $validated = $request->validate([
            'token' => 'required|unique:queues,token',
            'service_type' => 'required|integer',
            'person_type' => 'required|string|max:255',
        ]);

     

        $queues = Queue::create([
            'token' => $validated['token'],
            'time_in' => now()->format('H:i:s'),
            'process_name' => $validated['service_type'],
            'person_type' => $validated['person_type'],
        ]);
        
        event(new UpdateQueueTable());
        
        return response()->json([
            'ticket' => $queue,
        ]);
    }
}
