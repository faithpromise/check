<?php

namespace App\Services;

use App\Mail\CommentAdded;
use App\Models\Comment;
use Carbon\Carbon;
use Illuminate\Support\Facades\Mail;

class CommentSender {

    public function __construct(Comment $comment) {

        if ($comment->type === 'draft' || $comment->sent_at)
            return;

        // Remove sender from recipients
        $recipients = $comment->recipients->reject(function ($recipient) use ($comment) {
            return $recipient->id === $comment->sender->id;
        });

        foreach ($recipients as $recipient) {
            Mail::to($recipient)->send(new CommentAdded($comment));
        }

        $comment->sent_at = Carbon::now();
        $comment->save();

    }

}