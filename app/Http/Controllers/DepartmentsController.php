<?php

namespace App\Http\Controllers;

use App\Models\Department;
use App\Transformers\DepartmentTransformer;
use Illuminate\Http\Request;

class DepartmentsController extends Controller {

    public function index(Request $request) {

        $query = Department::orderBy('name');

        $includes = explode(',', $request->get('include'));

        if (in_array('projectCount', $includes)) {
            $query->withCount('projects');
            $key = array_search('projectCount', $includes);
            array_splice($includes, $key, 1);
        }

        // Search by query string

        if ($query_string = $request->get('query'))
            $query->where('name', 'like', '%' . $query_string . '%');

        // Search by id list

        if ($query_string = $request->has('ids')) {
            $query->whereIn('id', $request->get('ids'));
        }

        $departments = $query->get();

        if ($request->has('include'))
            $departments->load($includes);

        $data = fractal($departments, new DepartmentTransformer());

        if ($request->has('include'))
            $data->parseIncludes(implode(',', $includes));

        return $data->respond();
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request) {

        Department::unguard();

        $item = new Department();
        $item->fill($request->only($item->getFillable()))->save();

        return fractal($item, new DepartmentTransformer)->respond();
    }

    public function show($id, Request $request) {

        $department = Department::find($id);
        $includes = $request->get('include');

        if ($includes)
            $department->load(explode(',', $includes));

        $data = fractal($department, new DepartmentTransformer());

        if ($includes)
            $data->parseIncludes($includes);

        return $data->respond();
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
