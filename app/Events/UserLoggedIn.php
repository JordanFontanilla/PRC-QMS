<?php

namespace App\Events;

use Illuminate\Broadcasting\Channel;
use Illuminate\Queue\SerializesModels;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;
use App\Models\User;
use Illuminate\Contracts\Broadcasting\ShouldBroadcastNow;
use Illuminate\Support\Facades\Log;

class UserLoggedIn implements ShouldBroadcastNow
{
    use SerializesModels;

    public $user;

    public function __construct(User $user)
    {
        $this->user = $user;
        Log::info("UserLoggedIn event fired for user: " . $user->email);
    }

    public function broadcastOn()
    {
        return new Channel('user-login'); // Must match frontend listener
    }
}
