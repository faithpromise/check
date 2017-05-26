<?php

namespace App\Models;

use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Notifications\Notifiable;
use Illuminate\Foundation\Auth\User as Authenticatable;

/**
 * Class User
 * @package App\Models
 *
 * @property string $name
 * @property string $abbreviation
 * @property string $initials
 * @property string $avatar_url
 * @property Project[] $projects
 *
 */

class User extends Authenticatable {

    use SoftDeletes;
    use Notifiable;

    protected $table = 'users';
    public $appends = ['name', 'initials', 'abbreviation', 'avatar_url'];
    protected $fillable = ['first_name', 'last_name', 'email', 'password'];
    protected $hidden = ['password', 'remember_token'];

    /*
    |--------------------------------------------------------------------------
    | Relationships
    |--------------------------------------------------------------------------
    */

    public function department() {
        return $this->belongsTo(Department::class);
    }

    public function comments() {
        return $this->belongsToMany(Comment::class, 'comment_recipients');
    }

    public function projects() {
        return $this->hasMany(Project::class, 'requester_id');
    }

    /*
    |--------------------------------------------------------------------------
    | Accessors
    |--------------------------------------------------------------------------
    */

    public function getNameAttribute() {
        return trim($this->first_name . ' ' . $this->last_name);
    }

    public function getAbbreviationAttribute() {
        return trim($this->first_name . ' ' . substr($this->last_name, 0, 1) . '.');
    }

    public function getInitialsAttribute() {
        return strtoupper(substr($this->first_name, 0, 1) . substr($this->last_name, 0, 1));
    }

    public function getAvatarUrlAttribute() {
        return "http://www.gravatar.com/avatar/" . md5(strtolower(trim($this->email))) . "?d=monsterid&s=200";
    }

}
