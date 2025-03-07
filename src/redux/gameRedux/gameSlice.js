import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  games: [],
  sortBy: 'rating',
  favorites: JSON.parse(localStorage.getItem('favorites')) || [],
  currentPage: 1,
  gamesPerPage: 12, 
}

export const gamesSlice = createSlice({
  name: 'games',
  initialState,
  reducers: {
    setGames: (state, action) => {
      state.games = action.payload.games;
    },
    setSortBy: (state, action) => {
      state.sortBy = action.payload;
    },
    addFavorite: (state, action) => {
      state.favorites.push(action.payload);
      localStorage.setItem('favorites', JSON.stringify(state.favorites));
    },
    removeFavorite: (state, action) => {
      state.favorites = state.favorites.filter(game => game.id !== action.payload);
      localStorage.setItem('favorites', JSON.stringify(state.favorites));
    },
    setCurrentPage: (state, action) => {
      state.currentPage = action.payload; 
    },
  },
});

export const { setGames, setSortBy, addFavorite, removeFavorite, setCurrentPage } = gamesSlice.actions;

export default gamesSlice.reducer;