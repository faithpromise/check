<?php

namespace App\Http\Controllers;

use App\Models\Attachment;
use App\Models\Comment;
use App\Transformers\AttachmentTransformer;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Response;
use Intervention\Image\Facades\Image;

class AttachmentsController extends Controller {

    public function store(Request $request) {

        $new_attachments = collect([]);
        $files = $request->file('file');
        $comment = Comment::find($request->get('comment_id'));

        foreach ($files as $file) {

            $screenshot_index = $comment->attachments()->where('name', 'like', 'screenshot%')->count() + 1;
            $screenshot_name = $screenshot_index > 1 ? 'screenshot-' . $screenshot_index : 'screenshot';

            $path_info = pathinfo($file->getClientOriginalName());
            $filename = $path_info['filename'] === 'blob' ? $screenshot_name : $path_info['filename'];
            $extension = $file->guessExtension() ?: 'unknown';

            $attachment = new Attachment();
            $attachment->comment_id = $comment->id;
            $attachment->name = str_slug($filename) . '.' . str_replace('jpeg', 'jpg', $extension);
            $attachment->save();

            $file->storeAs('attachments', $attachment->file_name);

            $new_attachments->push($attachment);

        }

        return fractal($new_attachments, new AttachmentTransformer)->respond();

    }

    public function destroy($id) {
        $attachment = Attachment::find($id);
        unlink($attachment->path);
        $attachment->delete();
    }

    public function thumb($id) {

        $attachment = Attachment::find($id);

        if ($attachment->has_thumb) {

            $img = Image::make($attachment->path)->fit(200, 200);

            return $img->response('jpg');
        }

        return response('Not Found', 404);
    }

    public function download($id) {

        $attachment = Attachment::find($id);

        $file = File::get($attachment->path);
        $mime_type = File::mimeType($attachment->path);

        $response = Response::make($file, 200);
        $response->header('Content-Type', $mime_type);
        $response->header('Content-Disposition', 'inline; filename="' . $attachment->name . '"');

        return $response;
    }

}
