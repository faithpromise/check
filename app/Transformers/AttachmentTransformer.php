<?php

namespace App\Transformers;

use App\Models\Attachment;
use League\Fractal\TransformerAbstract;

class AttachmentTransformer extends TransformerAbstract {

    public function transform(Attachment $attachment) {

        $data = [
            'id'           => $attachment->id,
            'name'         => $attachment->name,
            'download_url' => $attachment->download_url,
            'thumb_url'    => $attachment->thumb_url,
        ];

        return $data;

    }

}