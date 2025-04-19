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
}
