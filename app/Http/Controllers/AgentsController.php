<?php

namespace App\Http\Controllers;

use App\Models\Agent;
use App\Transformers\AgentTransformer;
use Illuminate\Http\Request;

use Illuminate\Support\Facades\Auth;
use Tymon\JWTAuth\Facades\JWTAuth;

class AgentsController extends Controller {

    public function index(Request $request) {

        $user = JWTAuth::parseToken()->authenticate();

        $agents = Agent::query();

        if ($request->get('order_by') === 'me_on_top')
            $agents->orderByRaw('users.id = ' . $user->id . ' desc')->orderBy('first_name');

        // TODO: Limit agents to those within the current user's team/department

        $includes = explode(',', $request->get('include'));

        $result = $agents->get();

        if (!empty($includes))
            $result->load($includes);

        $data = fractal($result, new AgentTransformer());

        if ($request->has('include'))
            $data->parseIncludes($request->get('include'));

        return $data->respond();

    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create() {
        //
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

    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id) {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request $request
     * @param  int $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id) {
        //
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
