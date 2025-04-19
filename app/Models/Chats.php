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
}
