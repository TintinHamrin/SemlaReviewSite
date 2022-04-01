import { createSlice } from '@reduxjs/toolkit';
import { Bakery } from '../models/bakery';

const initialState = {
  reviews: [],
  // bakeryNameAlreadyKnown: false,
  // bakeryName: '',
};

const bakerySlice = createSlice({
  name: 'bakery',
  initialState: initialState,
  reducers: {
    loadReviews(state, action) {
      state.reviews = action.payload;
    },
    // bakeryNameAlreadyKnown(state, action) {
    //   state.bakeryNameAlreadyKnown = action.payload;
    // },
    // setBakeryName(state, action) {
    //   state.bakeryName = action.payload;
    // },
  },
});

export const bakeryActions = bakerySlice.actions;
export default bakerySlice.reducer;
