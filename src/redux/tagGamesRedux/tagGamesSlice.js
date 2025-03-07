import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  tag: null,
  games: [],
  loading: false,
  error: null,
  currentPage: 1, 
  gamesPerPage: 12, 
  totalGames: 0, 
};

export const tagGamesSlice = createSlice({
  name: 'tagGames',
  initialState,
  reducers: {
    setTag: (state, action) => {
      state.tag = action.payload;
    },
    setGames: (state, action) => {
      state.games = action.payload.results; 
      state.totalGames = action.payload.count;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    setCurrentPage: (state, action) => {
      state.currentPage = action.payload; 
    },
  },
});

export const { setTag, setGames, setLoading, setError, setCurrentPage } = tagGamesSlice.actions;

export default tagGamesSlice.reducer;