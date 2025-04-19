<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Chats extends Model
{
    //
    use HasFactory;

    protected $fillable = [
        'sender_id',
        'receiver_id',
        'last_message_id'
    ];

    public function lastMessage(){
        return $this->belongsTo(Messages::class, 'last_message_id');
    }
    
    public function sender(){
        return $this->belongsTo(User::class, 'sender_id');
    }

    public function receiver(){
        return $this->belingsTo(User::class, 'receiver_id');
    }
}
