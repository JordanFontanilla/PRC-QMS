<?php

namespace App\Http\Controllers;

use App\Models\Department;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Queue;
use App\Models\Process;
use App\Models\Counter;
use App\Models\QueueHistory;
use Carbon\Carbon;
use App\Events\DisplayQueueToken;
use App\Events\UpdateQueueTable;
use App\Events\UpdateCounterStatus;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;

class QueueTicketController extends Controller
{
    // View method: Fetch all counters and return to an Inertia page
    public function index(Request $request)
    {
        $queueTickets = Queue::whereNotIn('status', ['DONE', 'SERVING'])
            ->orderByRaw("CASE WHEN person_type != 'Regular' THEN 1 ELSE 0 END DESC") // Prioritize non-regular person_type
            ->orderBy('id', 'asc') // Then order by id
            ->get() // Retrieve as a collection
            ->map(function ($queue) {
                return [
                    'id' => $queue->id,
                    'process_name' => $queue->processRelation->process_name,
                    'token' => $queue->token,
                    'time_in' => $queue->time_in ? Carbon::parse($queue->time_in)->format('H:i:s') : null,
                    'time_out' => $queue->time_out ? Carbon::parse($queue->time_out)->format('H:i:s') : null,
                    'status' => $queue->status,
                    'person_type' => $queue->person_type,
                ];
            });

        $requestType = isset($request->type) ? $request->type : null;

        if ($requestType) {
            return Inertia::render('Receptionist/Display', [
                'queues' => $queueTickets,
            ]);
        } else {
            return Inertia::render('Admin/Queues', [
                'queues' => $queueTickets,
            ]);
        }
    }

    public function commandCenter()
    {
        // Get all queues where status is not 'DONE'
        $queueTickets = Queue::where('status', '=', 'WAITING')
            ->whereDate('created_at', now('Asia/Manila')->toDateString()) // Today in PH time
            ->orderByRaw("CASE WHEN person_type != 'Regular' THEN 1 ELSE 0 END DESC") // Prioritize non-regular
            ->orderBy('id', 'asc')
            ->get()
            ->map(function ($queue) {
                return [
                    'id' => $queue->id,
                    'process_name' => $queue->processRelation->process_name,
                    'token' => $queue->token,
                    'time_in' => $queue->time_in ? Carbon::parse($queue->time_in)->format('H:i:s') : null,
                    'time_out' => $queue->time_out ? Carbon::parse($queue->time_out)->format('H:i:s') : null,
                    'status' => $queue->status,
                    'person_type' => $queue->person_type,
                ];
            });

        $queueTicketsDone = Queue::whereIn('status', ['DONE', 'SERVING'])
            ->whereDate('created_at', now('Asia/Manila')->toDateString()) // Today in PH time
            ->orderBy('time_out', 'desc') // Then order by id
            ->get() // Retrieve as a collection
            ->map(function ($queue) {
                return [
                    'id' => $queue->id,
                    'process_name' => $queue->processRelation->process_name,
                    'token' => $queue->token,
                    'time_in' => $queue->time_in ? Carbon::parse($queue->time_in)->format('H:i:s') : null,
                    'time_out' => $queue->time_out ? Carbon::parse($queue->time_out)->format('H:i:s') : null,
                    'status' => $queue->status,
                    'person_type' => $queue->person_type,
                ];
            });

        $selectedCounter = Counter::where('user_id', auth()->id())
            ->first();

        // Get all processes
        $processes = Process::all();
        $counters = Counter::all();
        // Get latest queue information
        $latestQueue = Queue::where('status', '!=', 'DONE')
            ->orderByRaw("CASE WHEN person_type != 'Regular' THEN 1 ELSE 0 END DESC") // Prioritize non-regular person_type
            ->orderBy('id', 'asc') // Then order by id
            ->first(); // Get the first queue only

        // Map the result to the desired format
        if ($latestQueue) {
            $latestQueue = [
                'id' => $latestQueue->id,
                'process_name' => $latestQueue->processRelation->process_name,
                'token' => $latestQueue->token,
                'time_in' => $latestQueue->time_in ? Carbon::parse($latestQueue->time_in)->format('H:i:s') : null,
                'time_out' => $latestQueue->time_out ? Carbon::parse($latestQueue->time_out)->format('H:i:s') : null,
                'status' => $latestQueue->status,
                'person_type' => $latestQueue->person_type,
            ];
        }



        // Render the Inertia view with the data
        return Inertia::render('Receptionist/QueueCommandCenter', [
            'counters' => $counters,
            'queues' => $queueTickets,
            'processes' => $processes,
            'latestQueue' => $latestQueue,
            'calledQueue' => $queueTicketsDone,
            'selectedCounter' => $selectedCounter

        ]);
    }

    public function updateCounter(Request $request)
    {
        $counter_name = $request->counter_name ?? null;

        // Step 1: Update all counters assigned to the current user to inactive (set is_active = 0 and user_id = 0)
        $updatedRows = Counter::where('user_id', auth()->id()) // Get all counters where the user is assigned
            ->update([
                'is_active' => 0,
                'user_id' => 0,
            ]);

        Log::info("Updated {$updatedRows} counters to inactive for user: " . auth()->id());

        event(new UpdateCounterStatus());
        // Step 2: Update the selected counter with the new values (activate it for the current user)
        $affectedRows = Counter::where('id', $counter_name)
            ->update([
                'is_active' => 1,
                'user_id' => auth()->id(),
            ]);
        $counters = Counter::all();
        if ($affectedRows) {
            Log::info("Counter {$counter_name} updated successfully!");
        } else {
            Log::warning("Failed to update counter {$counter_name}. It might not exist or another error occurred.");
        }

        return response()->json([
            'success' => true,
            'message' => 'Counter updated successfully!',
            'counters' => $counters

        ]);
    }

    public function fetchCounter(Request $request)
    {
        $counters = Counter::all();

        return response()->json([
            'success' => true,
            'message' => 'Counter updated successfully!',
            'counters' => $counters

        ]);
    }
    public function fetchQueue(Request $request)
    {
        $process_name = $request->process_name ?? 'All';
        $counter_name = $request->counter_name ?? null;

        $dateToday = now('Asia/Manila')->toDateString();

        $waitingQuery = Queue::where('status', '=', 'WAITING')
            ->whereDate('created_at', $dateToday);

        $doneQuery = Queue::where('status', '!=', 'WAITING')
            ->whereDate('created_at', $dateToday);


        if ($process_name !== 'All') {
            $waitingQuery->where('process_name', $process_name);
            $doneQuery->where('process_name', $process_name);
        }

        $queueTicketsWaiting = $waitingQuery
            ->orderByRaw("CASE WHEN person_type != 'Regular' THEN 1 ELSE 0 END DESC")
            ->orderBy('id', 'asc')
            ->get()
            ->map(function ($queue) {
                return [
                    'id' => $queue->id,
                    'process_name' => $queue->processRelation->process_name,
                    'token' => $queue->token,
                    'time_in' => $queue->time_in ? Carbon::parse($queue->time_in)->format('H:i:s') : null,
                    'time_out' => $queue->time_out ? Carbon::parse($queue->time_out)->format('H:i:s') : null,
                    'status' => $queue->status,
                    'person_type' => $queue->person_type,

                ];
            });

        $queueTicketsDoneForTable = $doneQuery
            ->orderByRaw("CASE WHEN person_type != 'Regular' THEN 1 ELSE 0 END DESC")
            ->orderBy('id', 'asc')
            ->get()
            ->map(function ($queue) {
                return [
                    'id' => $queue->id,
                    'process_name' => $queue->processRelation->process_name,
                    'token' => $queue->token,
                    'time_in' => $queue->time_in ? Carbon::parse($queue->time_in)->format('H:i:s') : null,
                    'time_out' => $queue->time_out ? Carbon::parse($queue->time_out)->format('H:i:s') : null,
                    'status' => $queue->status,
                    'person_type' => $queue->person_type,

                ];
            });



        if ($counter_name) {
            $waitingQuery->where('counter', $counter_name);
            $doneQuery->where('counter', $counter_name);
        }

        $queueTickets = $waitingQuery
            ->orderByRaw("CASE WHEN person_type != 'Regular' THEN 1 ELSE 0 END DESC")
            ->orderBy('id', 'asc')
            ->get()
            ->map(function ($queue) {
                return [
                    'id' => $queue->id,
                    'process_name' => $queue->processRelation->process_name,
                    'token' => $queue->token,
                    'time_in' => $queue->time_in ? Carbon::parse($queue->time_in)->format('H:i:s') : null,
                    'time_out' => $queue->time_out ? Carbon::parse($queue->time_out)->format('H:i:s') : null,
                    'status' => $queue->status,
                    'person_type' => $queue->person_type,

                ];
            });

        $queueTicketServing = Queue::where('counter', '=', $counter_name)
            ->where('status', '=', 'SERVING')
            ->whereDate('created_at', $dateToday)
            ->orderByRaw("CASE WHEN person_type != 'Regular' THEN 1 ELSE 0 END DESC")
            ->first();

        if ($queueTicketServing) {
            $queueTicketServing = [
                'id' => $queueTicketServing->id,
                'process_name' => $queueTicketServing->processRelation->process_name,
                'token' => $queueTicketServing->token,
                'time_in' => $queueTicketServing->time_in ? Carbon::parse($queueTicketServing->time_in)->format('H:i:s') : null,
                'time_out' => $queueTicketServing->time_out ? Carbon::parse($queueTicketServing->time_out)->format('H:i:s') : null,
                'status' => $queueTicketServing->status,
                'person_type' => $queueTicketServing->person_type,
                'counter' =>  $queueTicketServing->counterRelation->counter_name
            ];
        }

        return response()->json([
            'queues' => $queueTicketsWaiting,
            'queuesDone' => $queueTicketsDoneForTable,
            'process_name' => $request->proecess_name,
            'counter_name' => $request->counter_name,
            'currentlyServing' => $queueTicketServing
        ]);
    }

    public function fetchQueueHistory(Request $request)
    {
        // Average processing time per counter (still based on time_in/time_out)
        $averageTurnaroundTime = Queue::selectRaw('
        AVG(TIMESTAMPDIFF(SECOND, time_in, time_out)) as avg_processing_time
    ')
            ->where('status', 'DONE')
            ->whereNotNull('time_in')
            ->whereNotNull('time_out')
            ->value('avg_processing_time');
        $formattedAverageTurnaroundTime = gmdate('H:i:s', (int) $averageTurnaroundTime);
        // Date range: last 30 days
        $startDate = Carbon::now()->subDays(30)->toDateString();
        $endDate = Carbon::now()->toDateString();

        // All processes
        $allProcesses = Process::all();

        // Generate date range list
        $dates = collect();
        $date = Carbon::parse($startDate);
        while ($date->lte(Carbon::parse($endDate))) {
            $dates->push($date->toDateString());
            $date->addDay();
        }

        // Get per-day, per-process totals based on created_at
        $report = DB::table('queues')
            ->join('processes', 'queues.process_name', '=', 'processes.id')
            ->select(
                DB::raw('DATE(queues.created_at) as date'),
                'processes.process_name as process_name',
                DB::raw('COUNT(queues.id) as total_processed')
            )
            ->where('queues.status', 'DONE')
            ->whereBetween(DB::raw('DATE(queues.created_at)'), [$startDate, $endDate])
            ->groupBy(DB::raw('DATE(queues.created_at)'), 'processes.process_name')
            ->orderBy('date')
            ->get();

        // Fill missing date-process combinations
        $filledReport = collect();
        foreach ($dates as $date) {
            foreach ($allProcesses as $process) {
                $match = $report->firstWhere(
                    fn($item) =>
                    $item->date === $date && $item->process_name === $process->process_name
                );

                $filledReport->push((object) [
                    'date' => $date,
                    'process_name' => $process->process_name,
                    'total_processed' => $match ? $match->total_processed : 0,
                ]);
            }
        }

        return response()->json([
            'chartData' => $formattedAverageTurnaroundTime,
            'processedReport' => $filledReport,
        ]);
    }

    public function displayServingInMonitor()
    {

        $dateToday = now('Asia/Manila')->toDateString();

        $servingQuery = Queue::where('status', '=', 'SERVING')
            ->whereDate('created_at', $dateToday);

        $queueTickets = $servingQuery
            ->orderByRaw("CASE WHEN person_type != 'Regular' THEN 1 ELSE 0 END DESC")
            ->orderBy('id', 'asc')
            ->get()
            ->map(function ($queue) {
                return [
                    'id' => $queue->id,
                    'process_name' => $queue->processRelation->process_name,
                    'token' => $queue->token,
                    'time_in' => $queue->time_in ? Carbon::parse($queue->time_in)->format('H:i:s') : null,
                    'time_out' => $queue->time_out ? Carbon::parse($queue->time_out)->format('H:i:s') : null,
                    'status' => $queue->status,
                    'person_type' => $queue->person_type,
                    'counter' => $queue->counterRelation->counter_name
                ];
            });

        return response()->json([
            'queues' => $queueTickets
        ]);
    }

    public function displayMonitor()
    {
        $queueTickets = Queue::where('status', '=', 'SERVING')
            ->whereDate('created_at', now('Asia/Manila')->toDateString()) // Today in PH time
            ->orderByRaw("CASE WHEN person_type != 'Regular' THEN 1 ELSE 0 END DESC") // Prioritize non-regular person_type
            ->orderBy('id', 'asc') // Then order by id
            ->get() // Retrieve as a collection
            ->map(function ($queue) {
                return [
                    'id' => $queue->id,
                    'process_name' => $queue->processRelation->process_name,
                    'token' => $queue->token,
                    'time_in' => $queue->time_in ? Carbon::parse($queue->time_in)->format('H:i:s') : null,
                    'time_out' => $queue->time_out ? Carbon::parse($queue->time_out)->format('H:i:s') : null,
                    'status' => $queue->status,
                    'person_type' => $queue->person_type,
                    'counter' => $queue->counterRelation->counter_name
                ];
            });

        $processes = Process::all();


        return Inertia::render('Receptionist/Display', [
            'queues' => $queueTickets,
            'processes' => $processes
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
    public function update(Request $request)
    {
        // Validate incoming request data
        $validatedData = $request->validate([
            'token' => 'required|string|max:255',
            'counter' => 'nullable|exists:counters,id', // Validate counter exists
            'process_name' => 'required|exists:processes,id'
        ]);

        // Additional validation if transfer_process exists
        if ($request->has('transfer_process')) {
            $request->validate([
                'transfer_process' => 'required|exists:processes,id'
            ]);
        }

        try {
            // Use database transaction for data consistency
            DB::beginTransaction();

            // Get current process (fail if not found)
            $currentProcess = Process::findOrFail($request->process_name);

            if ($request->has('transfer_process')) {
                // Handle transfer process
                $count = 0;
                $transferProcess = Process::findOrFail($request->transfer_process);

                $affectedRows = Queue::where('token', $validatedData['token'])
                    ->where('status', '!=', 'DONE')
                    ->update([
                        'process_name' => $transferProcess->id,
                        'counter' => null,
                        'status' => 'WAITING'
                    ]);

                // Create queue history for transfer
                QueueHistory::create([
                    'token' => $request->token,
                    'process_name' => $currentProcess->id,
                    'counter' => $request->counter,
                    'action' => 'Transferred client from ' . $currentProcess->process_name .
                        ' to ' . $transferProcess->process_name,
                    'user_id' => auth()->id(),
                ]);
            } else {
                // Handle completion
                if ($request->has('next')) {
                    $count = 0;
                    $affectedRows = Queue::where('token', $validatedData['token'])
                        ->where('status', '!=', 'DONE')
                        ->update([
                            'status' => 'DONE',
                            'time_out' => now(),
                        ]);

                    // Create queue history for completion
                    QueueHistory::create([
                        'token' => $request->token,
                        'process_name' => $currentProcess->id,
                        'counter' => $request->counter,
                        'action' => "Processed",
                        'user_id' => auth()->id(),
                    ]);
                } else {
                    $count = 3;
                    $affectedRows = Queue::where('token', $validatedData['token'])
                        ->where('status', '!=', 'DONE')
                        ->update([
                            'status' => 'SERVING',

                        ]);

                    // Create queue history for completion
                    QueueHistory::create([
                        'token' => $request->token,
                        'process_name' => $currentProcess->id,
                        'counter' => $request->counter,
                        'action' => "Last Call",
                        'user_id' => auth()->id(),
                    ]);
                }
            }

            if ($affectedRows === 0) {
                DB::rollBack();
                return response()->json([
                    'error' => true,
                    'message' => 'No matching active queues found for this token'
                ], 404);
            }

            // Trigger events
            event(new UpdateQueueTable());

            $counter = Counter::find($validatedData['counter']);
            if (!$counter) {
                DB::rollBack();
                return response()->json([
                    'error' => true,
                    'message' => 'Counter not found'
                ], 404);
            }

            event(new DisplayQueueToken($validatedData['token'], $count, $counter->counter_name));

            // Get next queue
            $latestQueue = Queue::with('processRelation')
                ->whereDate('created_at', now('Asia/Manila')->toDateString())
                ->where('status', '!=', 'DONE')
                ->orderByRaw("CASE WHEN person_type != 'Regular' THEN 0 ELSE 1 END")
                ->orderBy('id', 'asc')
                ->first();

            DB::commit();

            if ($latestQueue) {
                return response()->json([
                    'success' => true,
                    'queue' => [
                        'id' => $latestQueue->id,
                        'process_name' => $latestQueue->processRelation->process_name ?? null,
                        'token' => $latestQueue->token,
                        'time_in' => optional($latestQueue->time_in)->format('H:i:s'),
                        'time_out' => optional($latestQueue->time_out)->format('H:i:s'),
                        'status' => $latestQueue->status,
                        'person_type' => $latestQueue->person_type,
                    ],
                    'message' => 'Queue updated successfully',
                    'transfer_process' => $request->transfer_process ?? null
                ]);
            }

            return response()->json([
                'success' => true,
                'message' => 'Queue updated but no next queue available'
            ]);
        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json([
                'error' => true,
                'message' => 'Failed to update queue: ' . $e->getMessage()
            ], 500);
        }
    }
    public function displayQueue(Request $request)
    {
        // Validate the request data
        $validated = $request->validate([
            'token' => 'nullable',
            'count' => 'required|integer',  // Ensure count is a string
            'counter' => 'nullable',
            'process_name' => 'nullable'
        ]);

        if ($request->count == 1) {
            $action = "First Call";
        }

        if ($request->count == 2) {
            $action = "Call Again";
        }

        if ($request->count == 3) {
            $action = "Last Call";
        }

        $createQueueHistory = new QueueHistory;
        $createQueueHistory->token = $request->token;
        $createQueueHistory->process_name = $request->process_name;
        $createQueueHistory->counter = $request->counter;
        $createQueueHistory->action = $action;
        $createQueueHistory->user_id = auth()->id();
        $createQueueHistory->save();



        $counter = Counter::where('id', $validated['counter'])->first();
        $selectedToken = Queue::where('token', $validated['token'])->first();

        if ($selectedToken) {
            $selectedToken->status = 'SERVING';
            $selectedToken->counter = $counter->id;
            $selectedToken->save();
        }


        try {
            // Trigger the events with validated data
            event(new UpdateQueueTable());
            event(new DisplayQueueToken($validated['token'], $validated['count'], $counter->counter_name));

            return response()->json(['selectedQueue' => $selectedToken, 'success' => true]);
        } catch (\Exception $e) {
            return redirect()->back()
                ->with('error', 'Failed to update queue: ' . $e->getMessage());
        }
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
