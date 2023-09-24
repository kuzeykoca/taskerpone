<?php

namespace App\Services;

use App\Models\Task;
use Illuminate\Support\Facades\Log;

class TaskService
{
    public function createTask(): void
    {
        $project_id = request()->get('project_id');
        $name = request()->get('name');
        $info = request()->get('info');

        $task = new Task();
        $task->name = $name;
        $task->info = $info;
        $task->project_id = $project_id;
        $task->save();
    }

    public function updateTask(): void
    {
        $taskID = request()->get('task_id');
        $task = Task::find($taskID);
        $task->fill(request()->all());
        $task->save();
    }

    public function destroyTask(): void
    {
        $taskID = request()->get('task_id');
        $task = Task::find($taskID);
        $task->delete();
    }
}
