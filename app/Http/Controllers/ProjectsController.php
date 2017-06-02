<?php

namespace App\Http\Controllers;

use App\Models\Project;
use App\Transformers\ProjectsTransformer;
use Illuminate\Http\Request;

class ProjectsController extends Controller {

    public function index(Request $request) {

        $projects = Project::query();
        $includes = $request->get('include', null) ? explode(',', $request->get('include')) : [];

        // Limit to single requester

        if ($request->has('user_id')) {
            $user_id = $request->get('user_id');
            $projects->where(function ($query) use ($user_id) {
                $query->where('requester_id', '=', $user_id)->orWhere('agent_id', '=', $user_id);
            });
        }

        // By single requester

        if ($request->has('requester_id'))
            $projects->where('requester_id', '=', $request->get('requester_id'));

        // By department of the requester

        if ($request->has('requester_department_id')) {
            $department_id = $request->get('requester_department_id');
            $projects->whereHas('requester', function ($query) use ($department_id) {
                $query->where('department_id', '=', $department_id);
            });
        }

        // Inactive param

        if ($request->get('inactive'))
            $projects->inactive();

        // Closed param

        if ($request->get('closed'))
            $projects->closed()->orderBy('closed_at', 'desc')->limit($request->get('limit', 20));

        // Order

        if ($request->get('order_by') === 'inactive')
            $projects->orderBy('is_backlog', 'asc')->orderBy('closed_at', 'desc')->orderBy('created_at', 'desc');

        $result = $projects->get();

        if ($request->get('order_by') === 'status') {
            $result = $result->sortBy(function ($project) {
                return $project->status['sort'] . ($project->due_at ? ' ' . $project->due_at->timestamp : '');
            });
        }

        if (!empty($includes))
            $result->load($includes);

        $data = fractal($result, new ProjectsTransformer);

        if (!empty($includes))
            $data->parseIncludes($includes);

        return $data->respond();

    }

    public function show($id, Request $request) {

        $query = Project::withInactive()->where('id', '=', $id);

        if ($request->has('include'))
            $query->with(explode(',', $request->get('include')));

        $project = $query->first();

        $data = fractal($project, new ProjectsTransformer);

        if ($request->has('include'))
            $data->parseIncludes($request->get('include'));

        return $data->respond();

//        return [
//            'data' => Project::with('event', 'agent', 'requester', 'recipients')->whereId($id)->first()
//        ];

    }

//    public function store(Request $request) {
//        $project = new Project();
//        $project->fillMore($request->input('data'))->save();
//        $this->update_recipients($project, $request->input('data'));
//
//        return ['data' => $project];
//    }

//    public function update($id, Request $request) {
//        $project = Project::find($id);
//        $project->fillMore($request->input('data'))->save();
//        $this->update_recipients($project, $request->input('data'));
//
//        return ['data' => $project];
//    }

//    public function uploadThumb($id, Request $request) {
//
//        /** @var Project $project */
//        $project = Project::find($id);
//        $file = $request->file('file')[0];
//        $timestamp = Carbon::now()->timestamp;
//
//        $path_info = pathinfo($file->getClientOriginalName());
//        $project->setThumbFileName($timestamp . '.' . $path_info['extension']);
//        $project->save();
//
//        $file->move(storage_path('project-thumbs'), $project->getThumbPath());
//
//    }

//    public function thumb($id) {
//        /** @var Project $project */
//        $project = Project::find($id);
//        $img = Image::make($project->getThumbPath())->fit(200, 200);
//
//        return $img->response($project->getThumbExtension());
//    }

    private function update_recipients(Project $project, $data) {
        if (array_key_exists('recipients', $data)) {
            $recipients = array_pluck($data['recipients'], 'id');
            $project->recipients()->sync($recipients);
        }
    }

}
