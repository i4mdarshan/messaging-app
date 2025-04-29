import { createSlice } from "@reduxjs/toolkit";

const chatSlice = createSlice({
    name: "chat",
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

export const { setMessages, addMessage, clearMessages } = chatSlice.actions;
export default chatSlice.reducer;
