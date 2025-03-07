import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  events: [],
  userEvents: JSON.parse(localStorage.getItem('userEvents')) || [], 
};

export const eventSlice = createSlice({
  name: 'events',
  initialState,
  reducers: {
    setEvents: (state, action) => {
      state.events = action.payload;
    },
    addUserEvent: (state, action) => {
      state.userEvents.push(action.payload);
      localStorage.setItem('userEvents', JSON.stringify(state.userEvents)); 
    },
    removeUserEvent: (state, action) => {
      state.userEvents = state.userEvents.filter(event => event.id !== action.payload);
      localStorage.setItem('userEvents', JSON.stringify(state.userEvents)); 
    },
  },
});

export const { setEvents, addUserEvent, removeUserEvent } = eventSlice.actions;

export default eventSlice.reducer;