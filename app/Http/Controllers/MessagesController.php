<?php

namespace App\Http\Controllers;

use App\Models\Messages;
use App\Models\User;
use App\Models\Groups;
use Illuminate\Http\Request;
use App\Traits\BaseApiResponse;
use App\Http\Resources\MessagesResource;
use App\Http\Requests\StoreMessagesRequest;


class MessagesController extends Controller
{
    use BaseApiResponse;

    public function loadMessagesByUser(User $user)
    {
        $sender_id = auth()->id();
        $receiver_id = $user->id;
        $messages = Messages::loadUserMessages($sender_id, $receiver_id);
        return $messages;
    }

    public function loadMessagesByGroup(Groups $group): void
    {
        # code...
    }

    public function loadMessages(Request $request)
    {
        $request->validate([
            'user_id' => 'required|exists:users,id',
        ]);

        $user = User::findOrFail($request->user_id)->first();
        $messages = $this->loadMessagesByUser($user);
        $messages_collection = MessagesResource::collection($messages);
        return $this->successResponse([
            'selectedChat' => $user->toChatArray(),
            'messages' => $messages_collection,
        ]);
    }

    public function loadOlderMessages(Messages $message): void
    {
        # code...
    }

    public function store(StoreMessagesRequest $request): void
    {
        # code...
    }

    public function destroy(Messages $message): void
    {
        # code...
    }
}
