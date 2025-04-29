<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Messages extends Model
{
    use HasFactory;
    //

    protected $guarded = [
        'id'
    ];

    protected $fillable = [
        'message',
        'sender_id',
        'receiver_id',
        'groups_id'
    ];

    public function sender()
    {
        return $this->belongsTo(User::class, 'sender_id');
    }

    public function receiver()
    {
        return $this->belingsTo(User::class, 'receiver_id');
    }

    // public function attachments()
    // {
    //     return $this->hasMany(MessageAttachment::class, );
    // }

    public function group()
    {
        return $this->belongsTo(Groups::class);
    }

    public static function loadUserMessages($sender_id, $receiver_id)
    {
        $messages = Messages::where('sender_id', $sender_id)
            ->where('receiver_id', $receiver_id)
            ->orWhere('sender_id', $receiver_id)
            ->where('receiver_id', $sender_id)
            ->latest()
            ->paginate(10);
        return $messages;
    }

    public static function loadGroupMessages($group_id)
    {
        $messages = Messages::where('groups_id', $group_id)
            ->latest()
            ->paginate(10);
        return $messages;
    }
}
