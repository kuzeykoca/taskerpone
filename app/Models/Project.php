<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Project extends Model
{
    use HasFactory;

    public function Tasks(): hasMany
    {
        return $this->hasMany(Task::class);
    }

    public function User(): belongsTo
    {
        return $this->belongsTo(User::class);
    }
}
