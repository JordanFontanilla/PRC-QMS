<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Queue extends Model
{
    use HasFactory;
    protected $table = 'queues';

    protected $fillable = ['token', 'person_type', 'time_in', 'process_name']; // Adjust based on your table columns
    public function departmentRelation() // Changed from department()
    {
        return $this->belongsTo(Department::class, 'department', 'id');
    }

    public function processRelation() // Changed from department()
    {
        return $this->belongsTo(Process::class, 'process_name', 'id');
    }

    public function counterRelation() // Changed from department()
    {
        return $this->belongsTo(Counter::class, 'counter', 'id');
    }
}
