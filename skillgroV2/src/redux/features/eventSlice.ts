import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface Event {
    id: string;
    title: string;
    date: string;
    location: string;
    description: string;
    image: string;
}

interface EventState {
    events: Event[];
}

const initialState: EventState = {
    events: [],
};

export const eventSlice = createSlice({
    name: 'events',
    initialState,
    reducers: {
        setEvents: (state, action: PayloadAction<Event[]>) => {
            state.events = action.payload;
        },
    },
});

export const { setEvents } = eventSlice.actions;

export const selectEvents = (state: { events: EventState }) => state.events.events;

export default eventSlice.reducer;
