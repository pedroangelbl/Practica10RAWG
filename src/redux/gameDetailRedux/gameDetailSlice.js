import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  game: {},
  loading: false,
  error: null,
};

export const gameDetailSlice = createSlice({
  name: 'gameDetail',
  initialState,
  reducers: {
    setGame: (state, action) => {
      state.game = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
  },
});

export const { setGame, setLoading, setError } = gameDetailSlice.actions;

export default gameDetailSlice.reducer;