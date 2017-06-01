<?php

namespace App\Transformers;

use App\Models\Project;
use League\Fractal\TransformerAbstract;

class ProjectsTransformer extends TransformerAbstract {

    protected $availableIncludes = [
        'requester',
        'agent',
        'comments',
        'recipients',
    ];

//    protected $defaultIncludes = [
//        'requester',
//        'agent',
//    ];

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
            'is_active'          => $project->is_active,
        ];
    }

    public function includeRequester(Project $project) {
        return $this->item($project->requester, new UserTransformer);
    }

    public function includeAgent(Project $project) {
        if ($project->agent)
            return $this->item($project->agent, new UserTransformer);

        return null;
    }

    public function includeComments(Project $project) {
        return $this->collection($project->comments, new CommentTransformer);
    }

    public function includeRecipients(Project $project) {
        return $this->collection($project->recipients, new UserTransformer);
    }

}