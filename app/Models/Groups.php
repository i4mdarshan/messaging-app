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
}
