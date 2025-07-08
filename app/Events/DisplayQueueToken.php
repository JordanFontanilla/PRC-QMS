<?php

namespace App\Events;

use Illuminate\Broadcasting\Channel;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;

class DisplayQueueToken implements ShouldBroadcast
{
    use Dispatchable, SerializesModels;

    public $token;
    public $count;
    public $counter;
    /**
     * Create a new event instance.
     *
     * @param string $token
     * @param string $count
     * @param string $counter
     */
    public function __construct($token,$count,$counter)
    {
        $this->token = $token;
        $this->count = $count;
        $this->counter = $counter;
    }

    /**
     * Get the channels the event should broadcast on.
     *
     * @return array<int, \Illuminate\Broadcasting\Channel>
     */
    public function broadcastOn(): array
    {
        // Broadcasting on a public channel
        return [
            new Channel('displayQueue'),
        ];
    }

    /**
     * Get the data to broadcast.
     *
     * @return array
     */
    public function broadcastWith(): array
    {
        return [
            'token' => $this->token,
            'count' => $this->count,
            'counter' => $this->counter,
        ];
    }
}
