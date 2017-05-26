<?php

namespace App\Transformers;

use App\Models\Comment;
use League\Fractal\TransformerAbstract;
use s9e\TextFormatter\Bundles\Forum as TextFormatter;

class CommentTransformer extends TransformerAbstract {

    protected $availableIncludes = [
        'sender',
        'recipients',
        'attachments',
    ];

    public function transform(Comment $comment) {

        $parsed_body = TextFormatter::parse($comment->body);

        $data = [
            'id'         => $comment->id,
            'type'       => $comment->type,
            'body'       => $comment->html_body,
            'sent_at'    => $comment->sent_at ? $comment->sent_at->toDateTimeString() : null,
            'created_at' => $comment->created_at->toDateTimeString(),
        ];

        return $data;
    }

    public function includeSender(Comment $comment) {
        return $this->item($comment->sender, new UserTransformer);
    }

    public function includeRecipients(Comment $comment) {
        return $this->collection($comment->recipients, new UserTransformer);
    }

    public function includeAttachments(Comment $comment) {
        return $this->collection($comment->attachments, new AttachmentTransformer);
    }

}