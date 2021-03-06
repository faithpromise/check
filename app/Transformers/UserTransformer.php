<?php

namespace App\Transformers;

use App\Models\User;
use League\Fractal\TransformerAbstract;

class UserTransformer extends TransformerAbstract {

    protected $availableIncludes = [
        'department',
    ];

    public function transform(User $user) {

        $data = [
            'id'           => $user->id,
            'name'         => $user->name,
            'first_name'   => $user->first_name,
            'last_name'    => $user->last_name,
            'email'        => $user->email,
            'is_agent'     => $user->is_agent,
            'abbreviation' => $user->abbreviation,
            'initials'     => $user->initials,
            'avatar_url'   => $user->avatar_url,
        ];

        if (isset($user->projects_count))
            $data['projects_count'] = $user->projects_count;

        return $data;
    }

    public function includeDepartment(User $user) {

        if ($user->department)
            return $this->item($user->department, new DepartmentTransformer);

        return null;

    }

}