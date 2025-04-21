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


    /**
     * This function is used to get the groups of 
     * authenticated users which is used to show 
     * in the ChatsPane
     *
     * @param User $user Authenticated User
     * @return object
     * @throws conditon
     **/
    public static function getGroupsForUser(User $user) : object
    {
        $query = Groups::select(['groups.*', 'messages.message as last_message', 'messages.created_at as last_message_date'])
        ->join('groups_users', 'groups_users.groups_id', '=', 'groups.id')
        ->leftJoin('messages','messages.id','=','groups.last_message_id')
        ->where('groups_users.user_id', $user->id)
        ->orderBy('messages.created_at','desc');

        // dd($query->toSql());
        return $query->get();

    }

    /**
     * This function is used to convert the user model response
     * to the required chats reponse format 
     * which is used to display user chats on the ChatsPane 
     *
     * @param none
     * @return array
     * @throws conditon
     **/
    public function toChatArray() : array
    {
        return [
            'id' => $this->id,
            'name' => $this->name,
            'is_group' => true, //since this is a Group
            'is_user' => false,
            'owner_id' => (bool) $this->owner_id,
            'users' => $this->users,
            'user_ids' => $this->users->pluck('id'),
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,
            'last_message' => $this->last_message,
            'last_message_date' => $this->last_message_date
        ];
    }
}
