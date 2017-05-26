<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Collection;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use s9e\TextFormatter\Bundles\Forum as TextFormatter;


/**
 * Class Comment
 * @package App\Models
 *
 * @property integer $id
 * @property string $type
 * @property boolean $is_draft
 * @property boolean $is_published
 * @property string $body
 * @property string $html_body
 * @property \DateTime $sent_at
 * @property \DateTime $created_at
 * @property User $sender
 *
 */
class Comment extends Model {

    use SoftDeletes;

    protected $table = 'comments';
    protected $dates = ['sent_at', 'created_at', 'updated_at', 'deleted_at'];
    public $fillable = ['event_id', 'project_id', 'user_id', 'type', 'body'];
    public $appends = ['html_body'];

    public function event() {
        return $this->belongsTo(Event::class);
    }

    public function project() {
        return $this->belongsTo(Project::class);
    }

    public function task() {
        return $this->belongsTo(Task::class);
    }

    public function sender() {
        return $this->belongsTo(User::class, 'user_id');
    }

    public function recipients() {
        return $this->belongsToMany(User::class, 'comment_recipients', 'comment_id', 'user_id');
    }

    public function attachments() {
        return $this->hasMany(Attachment::class);
    }

    public function scopePublished($query) {
        $query->where('type', '!=', 'draft');
    }

    public function getIsPublishedAttribute() {
        return $this->type !== 'draft';
    }

    public function getIsDraftAttribute() {
        return $this->type === 'draft';
    }

    public function getHtmlBodyAttribute() {
        $xml = TextFormatter::parse($this->body);

        return TextFormatter::render($xml);
    }

    public function syncRecipients($recipient_ids) {

        $sender_id = $this->id;

        if ($recipient_ids instanceof Collection) {
            $recipient_ids = $recipient_ids->modelKeys();
        }

        // Always remove sender
        $recipient_ids = array_filter($recipient_ids, function ($id) use ($sender_id) {
            return $id !== $sender_id;
        });

        $this->recipients()->sync($recipient_ids);

    }

}
