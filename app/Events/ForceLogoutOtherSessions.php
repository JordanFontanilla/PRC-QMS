<?php

use Illuminate\Broadcasting\Channel;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;
use Illuminate\Queue\SerializesModels;

class ForceLogoutOtherSessions implements ShouldBroadcast
{
    use InteractsWithSockets, SerializesModels;

    public $userId;

    public function __construct($userId)
    {
        $this->userId = $userId;
    }

    public function broadcastOn()
    {
        return new \Illuminate\Broadcasting\Channel('user.' . $this->userId);
    }

    public function broadcastAs()
    {
        return 'force.logout';
    }
}
