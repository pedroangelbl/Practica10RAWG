import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  popularGames: [],
  actionGames: [],
  upcomingGames: [],
  loading: false,
  error: null,
  favorites: JSON.parse(localStorage.getItem('favorites')) || [],
};

export const homeSlice = createSlice({
  name: 'home',
  initialState,
  reducers: {
    setPopularGames: (state, action) => {
      state.popularGames = action.payload;
    },
    setActionGames: (state, action) => {
      state.actionGames = action.payload;
    },
    setUpcomingGames: (state, action) => {
      state.upcomingGames = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    addFavorite: (state, action) => {
      state.favorites.push(action.payload);
      localStorage.setItem('favorites', JSON.stringify(state.favorites));
    },
    removeFavorite: (state, action) => {
      state.favorites = state.favorites.filter(game => game.id !== action.payload);
      localStorage.setItem('favorites', JSON.stringify(state.favorites));
    },
  },
});

export const { setPopularGames, setActionGames, setUpcomingGames, setLoading, setError, addFavorite, removeFavorite } = homeSlice.actions;

export default homeSlice.reducer;