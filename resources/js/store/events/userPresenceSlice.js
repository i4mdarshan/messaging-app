import { createSlice } from "@reduxjs/toolkit";

const userPresenceSlice = createSlice({
    name: "usersPresence",
    initialState: {
        onlineUsers: {},
    },
    reducers: {
        setOnlineUsers(state, action) {
            state.onlineUsers = action.payload;
        },
        addOnlineUser(state, action) {
            const user = action.payload;
            if (user?.id) {
                state.onlineUsers[user.id] = user;
            }
        },
        removeOnlineUser(state, action) {
            const user = action.payload;
            if (user?.id && state.onlineUsers[user.id]) {
                delete state.onlineUsers[user.id];
            }
        },
    },
});

export const { setOnlineUsers, addOnlineUser, removeOnlineUser } =
    userPresenceSlice.actions;

export default userPresenceSlice.reducer;
