<?php

namespace App\Http\Controllers;

use App\Models\Messages;
use App\Models\User;
use App\Models\Groups;
use Exception;
use Illuminate\Http\Request;
use App\Traits\BaseApiResponse;
use App\Http\Resources\MessagesResource;
use App\Http\Requests\StoreMessagesRequest;
use Illuminate\Support\Facades\Validator;


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

    public function loadMessagesByGroup(Groups $group)
    {
        $messages = Messages::loadGroupMessages($group->id);
        return $messages;
    }

    public function loadMessages(Request $request)
    {
        /**
         * The request will contain chat_id.
         * If the is_user flag is true the chat_id will contain receiver user id
         * and sender_id will be by default the authenticated user id
         *
         * If the is_group flag is true the chat_id will contain groups_id
         *
         */
        $validator = Validator::make($request->all(), [
            'chat_id' => 'required|integer',
            'is_user' => 'required|boolean',
            'is_group' => 'required|boolean'
        ]);

        // handle validation errors
        if ($validator->fails()) {
            return $this->validationErrorResponse("Error while validating data", 422, $validator->errors()->getMessages());
        }

        $user = [];
        $group = [];
        $messages = [];
        $selectedChat = [];

        try {
            if ($request->is_user) {
                $user = User::where('id', $request->chat_id)->first();
                $messages = $this->loadMessagesByUser($user);
                $selectedChat = $user->toChatArray();
            }

            if ($request->is_group) {
                $group = Groups::where('id', $request->chat_id)->first();
                $messages = $this->loadMessagesByGroup($group);
                $selectedChat = $group->toChatArray();
            }

            $messages_collection = MessagesResource::collection($messages);
            return $this->successResponse("Messages fetched successfully", 200, [
                'selectedChat' => $selectedChat,
                'messages' => $messages_collection,
            ]);
        } catch (Exception $ex) {
            return $this->errorResponse("Error loading messages", 500, [$ex->getMessage()]);
        }

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
