<?php

namespace App\Models;

use App\Scopes\ActiveProjectScope;
use Carbon\Carbon;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Builder;

/**
 * Class Project
 * @package App\Models
 *
 *
 * @property Carbon $due_at
 * @property Carbon $artwork_due_at
 * @property integer $weekdays_remaining
 * @property string $full_name;
 * @property User $requester;
 *
 */
class Project extends Model {

    use SoftDeletes;

    protected $dates = ['due_at', 'closed_at', 'created_at', 'updated_at', 'ordered_at'];
    public $appends = ['full_name', 'estimated_delivery_date', 'is_overdue', 'is_overdue_likely', 'status', 'has_thumb', 'thumb_url'];
    public $fillable = ['requester_id', 'agent_id', 'name', 'notes', 'is_purchase', 'estimate_sent_at', 'production_days', 'is_template', 'approved_at', 'due_at', 'closed_at'];
    private $send_assignment_notification = true;
    private $create_setup_task = true;
    private $create_estimate_task = true;
    private $rebuild_owners_timeline = false;

    /*
    |--------------------------------------------------------------------------
    | Global Scopes
    |--------------------------------------------------------------------------
    */

    protected static function boot() {
        parent::boot();
        static::addGlobalScope(new ActiveProjectScope);
    }

    /*
    |--------------------------------------------------------------------------
    | Relationships
    |--------------------------------------------------------------------------
    */

    public function event() {
        return $this->belongsTo(Event::class);
    }

    public function requester() {
        return $this->belongsTo(Requester::class, 'requester_id')->withTrashed();
    }

    public function agent() {
        return $this->belongsTo(Agent::class, 'agent_id')->withTrashed();
    }

    public function tasks() {
        return $this->hasMany(Task::class);
    }

    public function incomplete_tasks() {
        return $this->hasMany(Task::class)->whereNull('completed_at');
    }

//    public function assignees() {
//        return $this->hasManyThrough(Agent::class, Task::class, 'agent_id', 'bar', 'jack');
//    }

    public function timeline_tasks() {
        return $this->hasMany(TimelineTask::class);
    }

    public function comments() {
        return $this->hasMany(Comment::class)->published()->orderBy('created_at', 'desc');
    }

    public function attachments() {
        return $this->hasManyThrough(Attachment::class, Comment::class);
    }

    public function recipients() {
        return $this->belongsToMany(User::class, 'project_recipients', 'project_id', 'user_id');
    }

    /*
    |--------------------------------------------------------------------------
    | Scopes
    |--------------------------------------------------------------------------
    */

    public function scopeWithInactive(Builder $query) {
        $query->withoutGlobalScope(ActiveProjectScope::class);
    }

    public function scopeInactive(Builder $query) {

        $query->withoutGlobalScope(ActiveProjectScope::class)->where(function ($query) {
            $query->where('is_backlog', '=', true)->orWhereNotNull('closed_at');
        });

    }

    public function scopeClosed(Builder $query) {

        $query->withoutGlobalScope(ActiveProjectScope::class)->whereNotNull('closed_at');

    }

    public function scopePending(Builder $query) {
        $query->where('is_backlog', '=', false)
            ->whereNull('closed_at')
            ->whereDoesntHave('tasks', function ($tasks_query) {
                $tasks_query->whereNull('completed_at');
            });
    }

    /*
    |--------------------------------------------------------------------------
    | Accessors
    |--------------------------------------------------------------------------
    */

    public function getIsActiveAttribute() {
        return (!$this->closed_at) && (!$this->is_backlog);
    }

    public function getArtworkDueAtAttribute() {
        return $this->due_at ? $this->due_at->copy()->subDays($this->production_days) : null;
    }

    public function getWeekdaysRemainingAttribute() {

        if (!$this->artwork_due_at)
            return null;

        $now = Carbon::now();

        return $now->diffInDaysFiltered(function ($dt) {
            return $dt->isWeekday();
        }, $this->artwork_due_at, false);
    }

    public function getStatusAttribute() {

        if ($this->closed_at) {
            return [
                'name' => 'Closed',
                'slug' => 'closed',
                'sort' => 7,
            ];
        }

        if ($this->ordered_at) {
            return [
                'name'        => 'Ordered',
                'description' => 'Ordered (ETA ' . $this->ordered_at->addDays($this->production_days)->format('n/j') . ')',
                'slug'        => 'ordered',
                'sort'        => 5,
            ];
        }

        if ($this->on_hold_until && $this->on_hold_until->isFuture()) {
            return [
                'name'        => 'On Hold',
                'description' => 'On Hold Until ' . $this->on_hold_until->diffForHumans(),
                'slug'        => 'onHold',
                'sort'        => 4,
            ];
        }

        if ($this->is_backlog) {
            return [
                'name' => 'Backlogged',
                'slug' => 'backlog',
                'sort' => 6,
            ];
        }

        if ($this->artwork_due_at && $this->artwork_due_at->isPast()) {
            return [
                'name' => 'Overdue',
                'slug' => 'overdue',
                'sort' => 1,
            ];
        }

        if ($this->incomplete_tasks()->get()->count()) {
            return [
                'name' => 'Active',
                'slug' => 'active',
                'sort' => 3,
            ];
        }

        return [
            'name' => 'Idle',
            'slug' => 'idle',
            'sort' => 2,
        ];

    }

    public function getFullNameAttribute() {
        $event = $this->event;

        if (!$event) {
            return $this->name;
        }

        return $this->name . ' for ' . $this->event->name;
    }

    public function getEstimatedDeliveryDateAttribute() {
        $est = $this->getEstimatedDeliveryDate();

        return is_null($est) ? $est : $est->toDateString();
    }

    public function getIsOverdueLikelyAttribute() {
        $est = $this->getEstimatedDeliveryDate();
        $margin = 7;

        return (!is_null($est) AND $est->gte($this->due_at->copy()->subDays($margin)));
    }

    public function getIsOverdueAttribute() {
        $est = $this->getEstimatedDeliveryDate();

        return (!is_null($est) AND $est->gte($this->due_at));
    }

    public function getThumbUrlAttribute() {
        return '/api/projects/' . $this->id . '/thumb.' . $this->getThumbExtension() . '?v=' . $this->getThumbFilename();
    }

    public function getHasThumbAttribute() {
        return !empty($this->thumb_file_name);
    }

    /*
    |--------------------------------------------------------------------------
    | Custom methods
    |--------------------------------------------------------------------------
    */

    public function getThumbFilename() {
        if ($this->has_thumb) {
            $path_info = pathinfo($this->thumb_file_name);

            return $path_info['filename'];
        }

        return 'default';
    }

    public function getThumbExtension() {
        if ($this->has_thumb) {
            $path_info = pathinfo($this->thumb_file_name);

            return $path_info['extension'];
        }

        return 'jpg';
    }

    public function getThumbPath() {

        if ($this->has_thumb) {
            $path_info = pathinfo($this->thumb_file_name);

            return storage_path('project-thumbs/' . $this->id . '.' . $path_info['extension']);
        }

        // Can't use `public_path` because it points to `backend` directory in development
        return dirname($_SERVER['SCRIPT_FILENAME']) . DIRECTORY_SEPARATOR . 'build' . DIRECTORY_SEPARATOR . 'images' . DIRECTORY_SEPARATOR . 'default-square.jpg';
    }

    /*
    |--------------------------------------------------------------------------
    | Mutators
    |--------------------------------------------------------------------------
    */

    public function setDueAtAttribute($param) {
        $this->attributes['due_at'] = $param ? (new Carbon($param)) : null;
    }

    public function setOrderedAtAttribute($param) {
        $this->attributes['ordered_at'] = $param ? (new Carbon($param)) : null;
    }

    public function setEstimateSentAtAttribute($param) {
        $this->attributes['estimate_sent_at'] = $param ? (new Carbon($param)) : null;
    }

    public function shouldSendAssignmentNotification() {
        return $this->send_assignment_notification;
    }

    public function disableAssignmentNotification() {
        $this->send_assignment_notification = false;

        return $this;
    }

    public function shouldCreateSetupTask() {
        return $this->create_setup_task;
    }

    public function disableSetupTask() {
        $this->create_setup_task = false;

        return $this;
    }

    public function shouldCreateEstimateTask() {
        return $this->create_estimate_task;
    }

    public function disableEstimateTask() {
        $this->create_estimate_task = false;

        return $this;
    }

    public function disableDefaultTasks() {
        $this->disableSetupTask();
        $this->disableEstimateTask();
    }

    public function shouldRebuildOwnersTimeline($value = null) {
        if (!is_null($value)) {
            $this->rebuild_owners_timeline = $value;

            return $this;
        }

        return $this->rebuild_owners_timeline;
    }

    private function getEstimatedDeliveryDate() {

        $production_days = (int)$this->production_days;

        if ($this->is_purchase && $last_task = $this->timeline_tasks()->where('type', '=', 'purchase')->first()) {
            $last_task_end = $last_task->timeline_date;
        }

        if (!isset($last_task_end)) {
            $last_task_end = new Carbon($this->timeline_tasks()->max('timeline_date'));
        }

        return $last_task_end->addDays($production_days);

    }

}
