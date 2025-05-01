import { createSlice } from "@reduxjs/toolkit";

const chatsSlice = createSlice({
    name: "chats",
    initialState: {
        chats: [],
    },
    reducers: {
        setChats: (state, action) => {
            state.chats = action.payload;
        },
        addChat: (state, action) => {
            state.chats.push(action.payload);
        },
        clearChats: (state) => {
            state.chats = [];
        },
        updateLastMessage: (state, action) => {
            const { chatId, lastMessage, lastMessageDate } = action.payload;
            const chat = state.chats.find((c) => c.id === chatId);
            if (chat) {
                chat.last_message = lastMessage;
                chat.last_message_date = lastMessageDate;
            }
        },
    },
});

export const { setChats, addChat, clearChats, updateLastMessage } =
    chatsSlice.actions;
export default chatsSlice.reducer;
