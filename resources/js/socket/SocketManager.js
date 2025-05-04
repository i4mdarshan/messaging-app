import { store } from "@/store/store";
import { addMessage } from "@/store/messages/messagesSlice";
import { updateLastMessage } from "@/store/chats/chatsSlice";
import {
    setOnlineUsers,
    addOnlineUser,
    removeOnlineUser,
} from "@/store/events/userPresenceSlice";

const joinedChannels = new Set();

// --- Presence Channel Setup ---
export const setupPresenceChannel = () => {
    Echo.join("online")
        .here((users) => {
            const onlineUsersObj = Object.fromEntries(
                users.map((user) => [user.id, user])
            );
            store.dispatch(setOnlineUsers(onlineUsersObj));
        })
        .joining((user) => {
            store.dispatch(addOnlineUser(user));
        })
        .leaving((user) => {
            store.dispatch(removeOnlineUser(user));
        })
        .error((error) => {
            console.error("[Presence Channel Error]:", error);
        });
};

export const leavePresenceChannel = () => {
    Echo.leave("online");
};

// --- Private Channel Initialization ---
export const initializeMessageChannels = (chats = [], userId) => {
    if (!Array.isArray(chats) || chats.length === 0) return;

    chats.forEach((chat) => {
        const channel = chat.is_user
            ? `messages.user.${[userId, chat.id]
                  .sort((a, b) => a - b)
                  .join("-")}`
            : `messages.group.${chat.id}`;

        if (joinedChannels.has(channel)) return;

        Echo.private(channel)
            .listen("SocketMessages", (event) => {
                const { message } = event;

                store.dispatch(
                    addMessage({
                        chatId: message.chat_id,
                        message,
                    })
                );

                store.dispatch(
                    updateLastMessage({
                        chatId: message.chat_id,
                        message: message.message,
                        date: message.created_at,
                    })
                );
            })
            .error((err) => {
                console.error(`[Socket Error] Channel: ${channel}`, err);
            });

        joinedChannels.add(channel);
    });
};

// --- Clean up all channels ---
export const leaveAllMessageChannels = () => {
    joinedChannels.forEach((channel) => Echo.leave(channel));
    joinedChannels.clear();
};
