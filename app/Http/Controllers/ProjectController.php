<?php

namespace App\Http\Controllers;

use App\Http\Requests\ProjectRequest;
use App\Services\ProjectService;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class ProjectController extends Controller
{
    protected ProjectService $projectService;

    public function __construct(ProjectService $projectService)
    {
        $this->projectService = $projectService;
    }

    public function index(Request $request): Response
    {
        return Inertia::render('Projects/Index', [
            'projects' => $this->projectService->getProjects()
        ]);
    }

    public function project(Request $request, int $project_id): Response
    {
        return Inertia::render('Projects/Project', [
            'project' => $this->projectService->getProject($project_id)
        ]);
    }

    public function create(ProjectRequest $request): void
    {
        $request->validated();
        $this->projectService->createProject();
    }

    public function update(ProjectRequest $request): void
    {
        $request->validated();
        $this->projectService->updateProject();
    }

    public function destroy():void
    {
        $this->projectService->destroyProject();
    }
}
