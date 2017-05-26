<?php

namespace App\Listeners;

use App\Events\CommentCreated;
use App\Services\CommentSender;

class SendComment {

    public function handle(CommentCreated $event) {
        new CommentSender($event->comment);
    }

}
