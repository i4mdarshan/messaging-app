<?php

namespace App\Events;

use App\Models\Messages;
use Illuminate\Queue\SerializesModels;
use App\Http\Resources\MessagesResource;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;
use Illuminate\Contracts\Broadcasting\ShouldBroadcastNow;
use Illuminate\Broadcasting\Channel; //Public - does not require auth
use Illuminate\Broadcasting\PrivateChannel; // Private - requires auth
use Illuminate\Broadcasting\PresenceChannel; // Gives info if the user joined or left the channel

class SocketMessages implements ShouldBroadcastNow
{
    use Dispatchable, InteractsWithSockets, SerializesModels;

    /**
     * Create a new event instance.
     */
    public function __construct(public Messages $message)
    {
        //
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
    public function broadcastWith(): array
    {
        return [
            'message' => new MessagesResource($this->message),
        ];
    }

    /**
     * Get the channels the event should broadcast on.
     *
     * @return array<int, \Illuminate\Broadcasting\Channel>
     */
    public function broadcastOn(): array
    {
       $m = $this->message;
       $channels = [];
       if ($m->group_id) {
            // channels.php has channel name in this format -> 'messages.group.{groupId}'
            $channels [] = new PrivateChannel('messages.group.'$m->group_id);
       }else{
            // channels.php has channel name in this format -> 'message.user.{senderId}-{receiverId}'
            $channels [] = new PrivateChannel('message.user.'.collect($m->sender_id, $m->receiver_id)->sort()->implode('-'));
       }

       return $channels;
    }
}
