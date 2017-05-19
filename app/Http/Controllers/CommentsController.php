<?php

namespace App\Http\Controllers;

use App\Models\Comment;
use App\Transformers\CommentTransformer;
use Illuminate\Http\Request;
use Tymon\JWTAuth\Facades\JWTAuth;

class CommentsController extends Controller {

    public function index() {
        //
    }

    public function store(Request $request) {

        $user = JWTAuth::parseToken()->authenticate();

        $data = $request->only('project_id', 'type', 'body');
        $data['user_id'] = $user->id;

        $comment = Comment::create($data);

        $this->update_recipients($comment, $request->get('recipients'));

        return fractal($comment, new CommentTransformer)->respond();

    }

    public function update($id, Request $request) {

        $comment = Comment::find($id);
        $comment->body = $request->get('body');
        $comment->save();

        $this->update_recipients($comment, $request->get('recipients'));

        return fractal($comment, new CommentTransformer)->respond();

    }

    public function destroy($id) {
        Comment::destroy($id);
    }

    private function update_recipients(Comment $comment, $recipients) {
        if (!empty($recipients)) {
            $recipient_ids = array_pluck($recipients, 'id');
            $comment->syncRecipients($recipient_ids);
        }
    }

}
