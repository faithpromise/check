<?php

namespace App\Transformers;

use App\Models\User;

class AgentTransformer extends UserTransformer {

    protected $availableIncludes = [
        'department',
        'projects',
    ];

    public function transform(User $user) {
        return parent::transform($user);
    }

    public function includeProjects(User $user) {

        $projects = $user->projects->sortBy(function ($project) {
            return $project->status['sort'] . ($project->due_at ? ' ' . $project->due_at->timestamp : '');
        });

        return $this->collection($projects, new ProjectsTransformer);

    }

}