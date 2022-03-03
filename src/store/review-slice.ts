import { createSlice } from '@reduxjs/toolkit';

const initialState = {};
const reviewSlice = createSlice({
  name: 'review',
  initialState: initialState,
  reducers: {},
});

export const reviewActions = reviewSlice.actions;
export default reviewSlice.reducer;
