<?php

use Illuminate\Foundation\Inspiring;
use Illuminate\Support\Facades\Artisan;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schedule;
use App\Models\Counter;
use App\Events\CounterStatusUpdated;
use Illuminate\Support\Facades\Log;
use App\Events\UpdateCounterStatus;
// Schedule::call(function () {
//     $activeUsers = DB::table('sessions')
//         ->where('last_activity', '>=', now()->subSeconds(15)->timestamp)
//         ->pluck('user_id');

//     // Free counters of inactive users
//     $released = Counter::whereNotNull('user_id')
//         ->whereNotIn('user_id', $activeUsers)
//         ->get();

//     foreach ($released as $counter) {
//         $counter->update(['user_id' => null]);
//         broadcast(new CounterStatusUpdated($counter->id));
//     }
// })->everySecond();

Schedule::call(function () {
    $activeUserIds = DB::table('sessions')
        ->whereNotNull('user_id')
        ->pluck('user_id')
        ->unique()
        ->toArray();

    $affected = DB::table('counters')
        ->whereNotIn('user_id', $activeUserIds)
        ->where('user_id', '!=', 0)
        ->update([
            'user_id' => 0,
            'is_active' => 0
        ]);

    if ($affected > 0) {
            event(new UpdateCounterStatus());
        Log::info("Cleared {$affected} inactive counters");
    }
    // Log::info("Counters cleaned: user_id reset to 0 for {$affected} counters because user was not active.");
})->everySecond();
