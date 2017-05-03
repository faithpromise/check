<?php

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Task extends Model {

    use TaskTrait;
    use SoftDeletes;

    protected $dates = ['start_at', 'due_at', 'completed_at', 'created_at', 'updated_at'];
    public $casts = ['due_at' => 'date'];
    public $appends = ['full_name', 'estimated_start_date', 'estimated_completion_date', 'calculated_due_at', 'deletable'];
    public $fillable = ['event_id', 'project_id', 'agent_id', 'name', 'notes', 'duration', 'start_at', 'due_at', 'completed_at', 'sort'];

    /*
    |--------------------------------------------------------------------------
    | Relationships
    |--------------------------------------------------------------------------
    */
    public function timeline_tasks() {
        return $this->hasMany(TimelineTask::class);
    }

    /*
    |--------------------------------------------------------------------------
    | Accessors
    |--------------------------------------------------------------------------
    */
    public function getIsStartAttribute() {
        return array_key_exists('is_start', $this->attributes) ? $this->attributes['is_start'] : true;
    }

    public function getCalculatedDueAtAttribute() {
        return $this->due_at ? $this->due_at : ($this->project ? (new Carbon($this->project->due_at)) : null);
    }

    public function getEstimatedStartDateAttribute() {
        return $this->timeline_tasks()->min('timeline_date');
    }

    public function getEstimatedCompletionDateAttribute() {
        return $this->timeline_tasks()->max('timeline_date');
    }

    public function getDeletableAttribute() {
        return is_null($this->type);
    }

    /*
    |--------------------------------------------------------------------------
    | Mutators
    |--------------------------------------------------------------------------
    */
    public function setDueAtAttribute($param) {
        $this->attributes['due_at'] = $param ? (new Carbon($param)) : null;
    }

    public function setCompletedAtAttribute($param) {
        $this->attributes['completed_at'] = $param ? (new Carbon($param)) : null;
    }

    /*
    |--------------------------------------------------------------------------
    | Custom methods
    |--------------------------------------------------------------------------
    */

    public function isCompleted() {
        return !is_null($this->completed_at);
    }

    // TODO: Needed? Better way?
    public function fillMore($data) {

        $this->fill($data);

        if (isset($data['event']['id'])) {
            $this->setEventId($data['event']['id']);
        }

        if (isset($data['project']['id'])) {
            $this->setProjectId($data['project']['id']);
        }

        if (isset($data['agent']['id'])) {
            $this->setAgentId($data['agent']['id']);
        }

        return $this;

    }

}
