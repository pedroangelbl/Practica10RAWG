import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  publishers: [],
  loading: false,
  error: null,
  currentPage: 1, 
  publishersPerPage: 12, 
  totalPublishers: 0, 
};

export const publishersSlice = createSlice({
  name: 'publishers',
  initialState,
  reducers: {
    setPublishers: (state, action) => {
      state.publishers = action.payload.results; 
      state.totalPublishers = action.payload.count; 
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

export const { setPublishers, setLoading, setError, setCurrentPage } = publishersSlice.actions;

export default publishersSlice.reducer;