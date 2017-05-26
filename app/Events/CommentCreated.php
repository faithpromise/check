<?php

namespace App\Events;

use App\Models\Comment;
use App\Transformers\CommentTransformer;
use Illuminate\Broadcasting\Channel;
use Illuminate\Queue\SerializesModels;
use Illuminate\Broadcasting\PrivateChannel;
use Illuminate\Broadcasting\PresenceChannel;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Contracts\Broadcasting\ShouldBroadcastNow;

class CommentCreated implements ShouldBroadcastNow {

    use Dispatchable, InteractsWithSockets, SerializesModels;

    public $comment;

    public function __construct(Comment $comment) {
        $this->comment = $comment;
    }

    public function broadcastOn() {
        return new Channel('project.' . $this->comment->project_id);
    }

    public function broadcastWith() {

        $data = fractal($this->comment, new CommentTransformer);
        $data->parseIncludes(['sender', 'recipients', 'attachments']);

        return $data->toArray();
    }

}
