<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Groups extends Model
{
    use HasFactory;
    //
    protected $fillable = [
        'name',
        'description',
        'owner_id',
        'last_message_id'
    ];

    public function users(){
        return $this->belongsToMany(User::class, 'groups_users');
    }

    public function messages(){
        return $this->hasMany(Messages::class,);
    }

    public function owner(){
        return $this->belongsTo(User::class);
    }
}
