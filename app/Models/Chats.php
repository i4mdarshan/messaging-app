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

    public function lastMessage()
    {
        return $this->belongsTo(Messages::class, 'last_message_id');
    }

    public function sender()
    {
        return $this->belongsTo(User::class, 'sender_id');
    }

    public function receiver()
    {
        return $this->belingsTo(User::class, 'receiver_id');
    }

    /**
     * undocumented function summary
     *
     * Undocumented function long description
     *
     * @param Type $var Description
     * @return type
     * @throws conditon
     **/
    public static function getChatsForSidebar(User $user)
    {
        $users = User::getUsersExceptUser($user);
        $groups = Groups::getGroupsForUser($user);

        return $users->map(function (User $user) {
            return $user->toChatArray();
        })->concat($groups->map(function (Groups $group) {
            return $group->toChatArray();
        }));
    }

    public static function updateChatsWithLastMessage($receiver_id, $sender_id, $message)
    {
        $chat = Chats::where(function ($query) use ($receiver_id, $sender_id) {
            $query->where('sender_id', $sender_id)
                ->where('receiver_id', $receiver_id);
        })->orWhere(function ($query) use ($sender_id, $receiver_id) {
            $query->where('sender_id', $receiver_id)
                ->where('receiver_id', $sender_id);
        })->first();

        if ($chat) {
            $chat->update([
                'last_message_id' => $message->id
            ]);
        } else {
            Chats::create([
                'sender_id' => $sender_id,
                'receiver_id' => $receiver_id,
                'last_message_id' => $message->id
            ]);
        }
    }
}
