import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  publisher: null,
  games: [],
  loading: false,
  error: null,
  currentPage: 1, 
  gamesPerPage: 12, 
  totalGames: 0, 
};

export const publisherSlice = createSlice({
  name: 'publisher',
  initialState,
  reducers: {
    setPublisher: (state, action) => {
      state.publisher = action.payload;
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

export const { setPublisher, setGames, setLoading, setError, setCurrentPage } = publisherSlice.actions;

export default publisherSlice.reducer;