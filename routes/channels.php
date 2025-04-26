<?php

use App\Models\User;
use App\Http\Resources\UserResource;
use Illuminate\Support\Facades\Broadcast;

Broadcast::channel('online', function (User $user) {
    return $user ? new UserResource($user) : null ;
});

Broadcast::channel('message.user.{senderId}-{receiverId}', function(User $user, int $sender_id, $receiver_id){
    return $user->id === $sender_id || $user->id === $receiver_id ? $user : null;
});

Broadcast::channel('messages.group.{groupId}', function(User $user, int $groupId){
    return $user->groups->contains('id',$groupId) ? $user : null;
});
