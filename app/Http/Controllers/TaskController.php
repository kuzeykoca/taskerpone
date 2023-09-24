<?php

namespace App\Http\Controllers;

use App\Services\TaskService;
use Illuminate\Http\Request;

class TaskController extends Controller
{
    protected TaskService $taskService;

    public function __construct(TaskService $taskService)
    {
        $this->taskService = $taskService;
    }

    public function create(Request $request): void
    {
        $request->validate([
            'project_id' => 'integer',
            'name' => 'string|max:255',
            'info' => 'string|max:1200',
        ]);
        $this->taskService->createTask();
    }

    public function update(Request $request): void
    {
        $request->validate([
            'task_id' => 'integer',
            'priority' => 'integer'
        ]);
        $this->taskService->updateTask();
    }

    public function destroy():void
    {
        $this->taskService->destroyTask();
    }
}
