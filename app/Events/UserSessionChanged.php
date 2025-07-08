<?php

namespace App\Events;

use Illuminate\Broadcasting\Channel;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Support\Facades\Log;

class UserSessionChanged implements ShouldBroadcast
{
    use Dispatchable, InteractsWithSockets;

    public $userId;
    public $sessionId;
    public $connection = 'sync'; // Temporary for debugging

    public function __construct($userId, $sessionId)
    {
        $this->userId = $userId;
        $this->sessionId = $sessionId;
        
        Log::debug('Event created', [
            'user' => $userId,
            'session' => $sessionId
        ]);
    }

    public function broadcastOn()
    {
        $channel = 'private-user.'.$this->userId.'.session'; // Changed to private-
        Log::debug('Broadcasting on channel: '.$channel);
        return new Channel($channel); // Keep as Channel (not PrivateChannel)
    }

    public function broadcastAs()
    {
        return 'UserSessionChanged'; // Explicit event name matching frontend
    }

    public function broadcastWith()
    {
        $payload = [
            'userId' => $this->userId,
            'sessionId' => $this->sessionId,
            'timestamp' => now()->toDateTimeString()
        ];
        
        Log::debug('Broadcast payload prepared', $payload);
        return $payload;
    }
}