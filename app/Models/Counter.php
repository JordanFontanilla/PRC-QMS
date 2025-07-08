<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Counter extends Model
{
    use HasFactory;
    protected $table = 'counters';

    protected $fillable = ['counter_name', 'floor_assignment'];

    public function departmentRelation() // Changed from department()
    {
        return $this->belongsTo(Department::class, 'department', 'id');
    }

    public function userRelation() // Changed from department()
    {
        return $this->belongsTo(User::class, 'user_id', 'id');
    }

    public function getUserNameAttribute()
    {
        if (!$this->userRelation) {
            return null;
        }

        return strtoupper(
            $this->userRelation->first_name . ' ' .
                ($this->userRelation->middle_name ?? '') .
                ($this->userRelation->middle_name ? ' ' : '') .
                $this->userRelation->last_name .
                ($this->userRelation->suffix ? ', ' . $this->userRelation->suffix : '')
        );
    }
}
