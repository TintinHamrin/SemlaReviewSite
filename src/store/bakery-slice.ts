import { createSlice } from '@reduxjs/toolkit';
import { Bakery } from '../models/bakery';

const initialState = {
  reviews: [],
  // bakery: '',
};

const bakerySlice = createSlice({
  name: 'bakery',
  initialState: initialState,
  reducers: {
    loadReviews(state, action) {
      state.reviews = action.payload;
    },
  },
});

export const bakeryActions = bakerySlice.actions;
export default bakerySlice.reducer;
