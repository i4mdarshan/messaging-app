<?php

use App\Models\User;
use App\Http\Resources\UserResource;
use Illuminate\Support\Facades\Broadcast;

Broadcast::channel('online', function (User $user) {
    return $user ? new UserResource($user) : null ;
});

Broadcast::channel('messages.user.{senderId}-{receiverId}', function(User $user, int $senderId, $receiverId){
    return $user->id === $senderId || $user->id === $receiverId ? $user : null;
});

Broadcast::channel('messages.group.{groupId}', function(User $user, int $groupId){
    return $user->groups->contains('id',$groupId) ? $user : null;
});
