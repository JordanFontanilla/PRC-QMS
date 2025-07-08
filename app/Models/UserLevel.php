<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;

class UserLevel extends Authenticatable
{
    use HasFactory;
    protected $table = 'user_levels';

    protected $fillable = [
        'user_level_name',

    ];

}
