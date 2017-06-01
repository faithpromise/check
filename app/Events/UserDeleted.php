<?php

namespace App\Events;

use App\Models\User;
use App\Transformers\UserTransformer;
use Illuminate\Broadcasting\Channel;
use Illuminate\Queue\SerializesModels;
use Illuminate\Broadcasting\PrivateChannel;
use Illuminate\Broadcasting\PresenceChannel;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Contracts\Broadcasting\ShouldBroadcastNow;

class UserDeleted implements ShouldBroadcastNow {

    use Dispatchable, InteractsWithSockets, SerializesModels;

    public $user;

    public function __construct(User $user) {
        $this->user = $user;
    }

    public function broadcastOn() {
        return new Channel('users');
    }

    public function broadcastWith() {

        $data = fractal($this->user, new UserTransformer);

        return $data->toArray();
    }

}
