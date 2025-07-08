<?php

namespace App\Events;

use Illuminate\Broadcasting\Channel;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Broadcasting\PresenceChannel;
use Illuminate\Broadcasting\PrivateChannel;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;

class CounterStatusUpdated implements ShouldBroadcast
{
    public $counterId;
    public $userId;

    public function __construct($counterId, $userId = null)
    {
        $this->counterId = $counterId;
        $this->userId = $userId;
    }

    public function broadcastOn()
    {
        return new Channel('counters');
    }
}
