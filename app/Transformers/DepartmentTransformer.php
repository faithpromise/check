<?php

namespace App\Transformers;

use App\Models\Department;
use League\Fractal\TransformerAbstract;

class DepartmentTransformer extends TransformerAbstract {

    protected $availableIncludes = [
        'requested_projects',
    ];

    public function transform(Department $department) {
        return [
            'id'   => $department->id,
            'name' => $department->name,
        ];
    }

    public function includeRequestedProjects(Department $department) {
        return $this->collection($department->requested_projects, new ProjectsTransformer);
    }

}