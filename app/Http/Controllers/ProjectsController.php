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

        /** @var User $user */
        $user = JWTAuth::parseToken()->authenticate();

        // TODO: Only get agents within the current user's team/department
        $agents = Agent::with('projects')->get();

        dd($agents);




        $projects = Project::with('requester')->with('agent.department')->whereIn('agent_id', $agents->pluck('id'))->get();
//        $group_by = $request->input('group_by', 'agent');

        $data = fractal($projects, new ProjectsTransformer());

        return $data->respond();

    }

//    public function show($id) {
//
//        return [
//            'data' => Project::with('event', 'agent', 'requester', 'recipients')->whereId($id)->first()
//        ];
//
//    }

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
