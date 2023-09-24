<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\ProjectController;
use App\Http\Controllers\TaskController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    Route::get('/projects', [ProjectController::class, 'index'])->name('projects');
    Route::get('/project/{project_id}', [ProjectController::class, 'project'])->name('project');
    Route::post('/projects', [ProjectController::class, 'create'])->name('projects.create');
    Route::patch('/projects', [ProjectController::class, 'update'])->name('projects.update');
    Route::delete('/projects', [ProjectController::class, 'destroy'])->name('projects.destroy');

    Route::post('/task', [TaskController::class, 'create'])->name('task.create');
    Route::patch('/task', [TaskController::class, 'update'])->name('task.update');
    Route::delete('/task', [TaskController::class, 'destroy'])->name('task.destroy');
});

require __DIR__.'/auth.php';
