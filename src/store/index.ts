import { configureStore } from '@reduxjs/toolkit';
import authSlice from './auth-slice';
import bakerySlice from './bakery-slice';
import reviewSlice from './review-slice';

const store = configureStore({
  reducer: {
    auth: authSlice,
    review: reviewSlice,
    bakery: bakerySlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export default store;
