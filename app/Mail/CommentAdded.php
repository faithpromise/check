<?php

namespace App\Mail;

use App\Models\Comment;
use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class CommentAdded extends Mailable {

    use Queueable, SerializesModels;

    public $comment;

    /**
     * Create a new message instance.
     * @param Comment $comment
     */
    public function __construct(Comment $comment) {
        $this->comment = $comment;
    }

    /**
     * Build the message.
     *
     * @return $this
     */
    public function build() {

        // Set sender
        $this->from($this->comment->sender->email, $this->comment->sender->name);
        $this->replyTo('comment_' . $this->comment->id . '@mailgun.faithpromise.org', $this->comment->sender->name);
        $this->subject($this->comment->project->name);

        return $this->view('emails.comment-html')->text('emails.comment');
    }
}
