<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Department extends Model {

    protected $fillable = ['name'];

    public function requested_projects() {
        return $this->hasManyThrough(Project::class, User::class, 'department_id', 'requester_id', 'id');
    }

}
