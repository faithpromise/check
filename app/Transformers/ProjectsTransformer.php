<?php

namespace App\Transformers;

use App\Models\Project;
use League\Fractal\TransformerAbstract;

class ProjectsTransformer extends TransformerAbstract {

    protected $availableIncludes = [
        'requester',
        'agent',
    ];

    protected $defaultIncludes = [
        'requester',
        'agent',
    ];

    public function transform(Project $project) {
        return [
            'id'                 => $project->id,
            'name'               => $project->name,
            'notes'              => $project->notes,
            'is_purchase'        => $project->is_purchase,
            'purchase_order'     => $project->purchase_order,
            'production_days'    => $project->production_days,
            'is_backlog'         => $project->is_backlog,
            'ordered_at'         => $project->ordered_at ? $project->ordered_at->toDateTimeString() : null,
            'created_at'         => $project->created_at->toDateTimeString(),
            'due_at'             => $project->due_at ? $project->due_at->toDateTimeString() : null,
            'artwork_due_at'     => $project->due_at ? $project->artwork_due_at->toDateTimeString() : null,
            'weekdays_remaining' => $project->weekdays_remaining,
            'status'             => $project->status,
        ];
    }

    public function includeRequester(Project $project) {
        return $this->item($project->requester, new UserTransformer);
    }

    public function includeAgent(Project $project) {
        return $this->item($project->agent, new UserTransformer);
    }

}