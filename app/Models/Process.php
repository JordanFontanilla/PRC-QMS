<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Process extends Model
{
    use HasFactory;
    protected $table = 'processes';

    protected $fillable = ['process_name','department']; 
    // Adjust based on your table columns


    public function departmentRelation() // Changed from department()
    {
        return $this->belongsTo(Department::class, 'department', 'id');
    }
}
