<?php

namespace App\Http\Controllers;

use App\Events\UserDeleted;
use App\Events\UserSaved;
use App\Models\User;
use App\Transformers\UserTransformer;
use Illuminate\Http\Request;

class UsersController extends Controller {

    public function index(Request $request) {

        $query = User::orderBy('first_name')->orderBy('last_name');

        $includes = explode(',', $request->get('include'));

        if (in_array('projectCount', $includes)) {
            $query->withCount('projects');
            $key = array_search('projectCount', $includes);
            array_splice($includes, $key, 1);
        }

        $users = $query->get();

        if ($request->has('include'))
            $users->load($includes);

        $data = fractal($users, new UserTransformer());

        if ($request->has('include'))
            $data->parseIncludes(implode(',', $includes));

        return $data->respond();
    }

    public function store(Request $request) {

        User::unguard();

        $user = new User();
        $user->fill($request->only($user->getFillable()))->save();

        event(new UserSaved($user));

        return fractal($user, new UserTransformer)->respond();

    }

    public function show($id, Request $request) {

        $user = User::find($id);
        $includes = $request->get('include');

        if ($includes)
            $user->load(explode(',', $includes));

        $data = fractal($user, new UserTransformer);

        if ($includes)
            $data->parseIncludes($includes);

        return $data->respond();
    }

    public function update(Request $request, $id) {

        $user = User::find($id);
        $user->fill($request->only($user->getFillable()))->save();

        event(new UserSaved($user));

        return fractal($user, new UserTransformer)->respond();

    }

    public function destroy($id) {

        $user = User::find($id);
        $user->delete();

        event(new UserDeleted($user));
    }

}
