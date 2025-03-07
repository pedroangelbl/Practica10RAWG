import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  games: JSON.parse(localStorage.getItem('favorites')) || [],
  favorites: JSON.parse(localStorage.getItem('favorites')) || [],
  currentPage: 1,
  gamesPerPage: 12, 
}

export const favoritoSlice = createSlice({
  name: 'favorito',
  initialState,
  reducers: {
    setGames: (state, action) => {
      state.games = action.payload.games;
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

export const { setGames, addFavorite, removeFavorite, setCurrentPage } = favoritoSlice.actions;

export default favoritoSlice.reducer;