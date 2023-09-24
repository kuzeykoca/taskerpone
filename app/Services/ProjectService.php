<?php

namespace App\Services;

use App\Models\Project;
use Illuminate\Pagination\LengthAwarePaginator;

class ProjectService
{
    public function getProjects():LengthAwarePaginator
    {
        $user = request()->user();
        return $user->Projects()->paginate(30);
    }

    public function getProject(int $project_id): Project
    {
        $project = Project::find($project_id);
        $project->tasks = $project->Tasks()
            ->orderBy('updated_at', 'desc')
            ->paginate(8);

        return $project;
    }

    public function createProject(): void
    {
        $user = request()->user();
        $name = request()->get('name');

        $project = new Project();
        $project->name = $name;
        $project->User()->associate($user);
        $project->save();
    }

    public function updateProject(): void
    {
        $projectID = request()->get('project_id');
        $name = request()->get('name');

        $project = Project::find($projectID);
        $project->name = $name;
        $project->save();
    }

    public function destroyProject(): void
    {
        $projectID = request()->get('project_id');
        $project = Project::find($projectID);
        $project->delete();
    }
}
