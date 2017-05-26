<?php

namespace App\Http\Controllers;

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

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create(Request $request) {

        User::unguard();

        $user = new User();
        $user->fill($request->only($user->getFillable()))->save();

        event(new UserSaved($user));

        return fractal($user, new UserTransformer)->respond();

    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request) {
        //
    }

    /**
     * Display the specified resource.
     *
     * @param  int $id
     * @return \Illuminate\Http\Response
     */
    public function show($id) {

        $user = User::find($id);

        return fractal($user, new UserTransformer)->respond();

    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request $request
     * @param  int $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id) {

        $user = User::find($id);
        $user->fill($request->only($user->getFillable()))->save();

        event(new UserSaved($user));

        return fractal($user, new UserTransformer)->respond();

    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id) {
        //
    }
}
