<?php

namespace App\Models;

class Requester extends User {

    // TODO: Global scope to limit to !is_agent

    /*
    |--------------------------------------------------------------------------
    | Relationships
    |--------------------------------------------------------------------------
    */

    public function projects() {
        return $this->hasMany(Project::class);
    }

}
