import { configureStore } from "@reduxjs/toolkit";
import chatsReducer from "@/store/chats/chatsSlice";
import messagesReducer from "@/store/messages/messagesSlice";

export const store = configureStore({
    reducer: {
        chats: chatsReducer,
        messages: messagesReducer,
    },
});
