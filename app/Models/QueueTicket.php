<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class QueueTicket extends Model
{
    use HasFactory;
    protected $table = 'queue_tickets';

    protected $fillable = ['queue_ticket']; // Adjust based on your table columns
    
}