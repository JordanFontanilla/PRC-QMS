<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class QueueHistory extends Model
{
    use HasFactory;
    protected $table = 'queue_history';

    protected $fillable = ['token', 'process_name', 'counter', 'action', 'user_id']; // Adjust based on your table columns
    public function counterRelation() // Changed from department()
    {
        return $this->belongsTo(Counter::class, 'counter', 'id');
    }

    public function processRelation() // Changed from department()
    {
        return $this->belongsTo(Process::class, 'process_name', 'id');
    }
}
