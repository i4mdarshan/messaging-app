import { createSlice } from "@reduxjs/toolkit";

const eventsSlice = createSlice({
    name: "events",
    initialState: {
        events: [],
    },
    reducers: {
        emitEvent: (state, action) => {
            const { name, data } = action.payload;
            if (state.events[name]) {
                for (let cb of state.events[name]) {
                    cb(data);
                }
            }
        },

        addEvent: (state, action) => {
            const { name, cb } = action.payload;

            if (!state.events[name]) {
                state.events[name] = [];
            }

            state.events[name].push(cb);

            return () => {
                state.events[name] = state.events[name].filter(
                    (callback) => callback != cb
                );
            };
        },
    },
});

export const { emitEvent, addEvent } = eventsSlice.actions;
export default eventsSlice.reducer;
