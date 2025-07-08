<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Illuminate\Support\Facades\DB;

class CleanCounterUserIds extends Command
{
    protected $signature = 'counters:clean-user-ids';
    protected $description = 'Remove user_id from counters if user has no active session';

    public function handle()
    {
        
        $activeUserIds = DB::table('sessions')
            ->whereNotNull('user_id')
            ->pluck('user_id')
            ->unique()
            ->toArray();

        DB::table('counters')
            ->whereNotIn('user_id', $activeUserIds)
            ->where('user_id', '!=', 0)
            ->update(['user_id' => 0]);

        $this->info('Counters cleaned successfully.');
    }
}