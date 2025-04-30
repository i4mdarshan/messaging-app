import { createSlice } from "@reduxjs/toolkit";

const chatSlice = createSlice({
    name: "chats",
    initialState: {
        chats: [],
    },
    reducers: {
        setMessages: (state, action) => {
            state.chats = action.payload;
        },
        addMessage: (state, action) => {
            state.chats.push(action.payload);
        },
        clearMessages: (state) => {
            state.chats = [];
        },
    },
});

export const { setMessages, addMessage, clearMessages } = chatSlice.actions;
export default chatSlice.reducer;
