import { configureStore } from "@reduxjs/toolkit";
import chatReducer from "../store/chats/chatsSlice";

export const store = configureStore({
    reducer: {
        chat: chatReducer,
    },
});
