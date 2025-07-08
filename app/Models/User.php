<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;

class User extends Authenticatable
{
    use HasFactory, Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'first_name',
        'middle_name',
        'last_name',
        'suffix',
        'email',
        'password',
        'user_level',
    ];
    protected $appends = ['fullName'];
    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
        ];
    }

    public function getRoleNameAttribute(): string
    {
        $roles = [
            '1' => 'Super Admin',
            '2' => 'Legal',
            '3' => 'Registration',
            '4' => 'Fad',
        ];

        return $roles[$this->attributes['role']] ?? 'Unknown Role';
    }

    public function userHasUserLevel() // Changed from department()
    {
        return $this->belongsTo(UserLevel::class, 'user_level', 'id');
    }

    public function getFullNameAttribute(): string
    {
        $fullName = $this->first_name;

        if (!empty($this->middle_name)) {
            $fullName .= ' ' . $this->middle_name;
        }

        $fullName .= ' ' . $this->last_name;

        if (!empty($this->suffix)) {
            $fullName .= ' ' . $this->suffix;
        }

        return strtoupper($fullName);
    }
}
