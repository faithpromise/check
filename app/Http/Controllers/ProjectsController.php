<?php

namespace App\Http\Controllers;

use App\Models\Agent;
use App\Models\Project;
//use Carbon\Carbon;
use App\Models\User;
use App\Transformers\ProjectsTransformer;
use Illuminate\Http\Request;
use Tymon\JWTAuth\Facades\JWTAuth;

//use App\Http\Requests;
//use Intervention\Image\Facades\Image;

class ProjectsController extends Controller {

    public function index(Request $request) {

        $projects = Project::query();

        if ($request->has('requester_id'))
            $projects->where('requester_id', '=', $request->get('requester_id'));

        $result = $projects->get();

        $result = $result->sortBy(function ($project) {
            return $project->status['sort'] . ($project->due_at ? ' ' . $project->due_at->timestamp : '');
        });

        if ($request->has('include'))
            $result->load(explode(',', $request->get('include')));

        $data = fractal($result, new ProjectsTransformer);

        if ($request->has('include'))
            $data->parseIncludes($request->get('include'));

        return $data->respond();

    }

    public function show($id, Request $request) {

        $query = Project::where('id', '=', $id);

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
