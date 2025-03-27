// src/store/store.js
import { configureStore } from '@reduxjs/toolkit';
import campaignReducer from './campaignSlice';

export const store = configureStore({
  reducer: {
    campaigns: campaignReducer,
    // Add other reducers here if you have more features
  },
});

export default store;