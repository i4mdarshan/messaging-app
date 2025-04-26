<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;

class User extends Authenticatable
{
    /** @use HasFactory<\Database\Factories\UserFactory> */
    use HasFactory, Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'name',
        'email',
        'password',
        'email_verified_at',
        'is_admin'
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var list<string>
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

    public function groups()
    {
        return $this->belongsToMany(Groups::class, 'groups_users');
    }

    /**
     * This function is used to return the users based on the
     * authenticated user and the results are sorted
     * based on the created date of the last message from the users
     *
     * @param User $user The current logged in user
     * @return object
     *
     **/
    public static function getUsersExceptUser(User $user): object
    {
        // basically the current logged in user
        $userId = $user->id;

        $query = User::select(['users.*', 'messages.message as last_message', 'messages.created_at as last_message_date'])
            ->where('users.id', '!=', $userId) // remove in future to add own chats
            ->leftJoin('chats', function ($join) use ($userId) {
                $join->on('chats.sender_id', '=', 'users.id')
                    ->where('chats.receiver_id', '=', $userId)
                    ->orWhere(function ($query) use ($userId) {
                        $query->on('chats.receiver_id', '=', 'users.id')
                            ->where('chats.sender_id', '=', $userId);
                    });
            })
            ->leftJoin('messages', 'messages.id', '=', 'chats.last_message_id')
            ->orderBy('messages.created_at', 'desc');

        // dd($query->toSql());
        return $query->get();
    }

    /**
     * This function is used to convert the user model response
     * to the required chats reponse format
     * which is used to display user chats on the ChatsPane
     *
     * @param null
     * @return array
     **/
    public function toChatArray(): array
    {
        return [
            'id' => $this->id,
            'name' => $this->name,
            'username' => $this->username,
            'avatar_url' => $this->avatar,
            'is_group' => false, //since this is single User
            'is_user' => true,
            'is_admin' => (bool) $this->is_admin,
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,
            'blocked_at' => $this->blocked_at,
            'last_message' => $this->last_message,
            'last_message_date' => $this->last_message_date
        ];
    }
}
