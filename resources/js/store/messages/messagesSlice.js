import { createSlice } from "@reduxjs/toolkit";

const messagesSlice = createSlice({
    name: "messages",
    initialState: {
        chatMessages: [],
    },
    reducers: {
        setMessages: (state, action) => {
            state.chatMessages = action.payload;
        },
        addMessage: (state, action) => {
            state.chatMessages.push(action.payload);
        },
        clearMessages: (state) => {
            state.chatMessages = [];
        },
    },
});

export const { setMessages, addMessage, clearMessages } = messagesSlice.actions;
export default messagesSlice.reducer;
