import { createSlice } from "@reduxjs/toolkit";

const chatsSlice = createSlice({
    name: "chats",
    initialState: {
        chats: [],
        selectedChat: {},
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
            const { receiverId, lastMessage, lastMessageDate, groupId } =
                action.payload;
            const chat = state.chats.find(
                (c) =>
                    c.id === parseInt(receiverId) ||
                    (c.id === parseInt(groupId) && c.is_group === !!groupId)
            );
            if (chat) {
                chat.last_message = lastMessage;
                chat.last_message_date = lastMessageDate;
            }
        },
        selectChat: (state, action) => {
            state.selectedChat = action.payload;
        },
        clearSelectedChat: (state) => {
            state.selectedChat = {};
        },
    },
});

export const {
    setChats,
    addChat,
    clearChats,
    updateLastMessage,
    selectChat,
    clearSelectedChat,
} = chatsSlice.actions;
export default chatsSlice.reducer;
