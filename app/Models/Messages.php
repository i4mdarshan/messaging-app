<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Messages extends Model
{
    use HasFactory;
    //

    protected $fillable = [
        'message',
        'sender_id',
        'receiver_id',
        'group_id'
    ];

    public function sender(){
        return $this->belongsTo(User::class, 'sender_id');
    }

    public function receiver(){
        return $this->belingsTo(User::class, 'receiver_id');
    }

    public function attachments(){
        return $this->hasMany(MessageAttachment::class,);
    }

    public function group(){
        return $this->belongsTo(Groups::class);
    }
}
