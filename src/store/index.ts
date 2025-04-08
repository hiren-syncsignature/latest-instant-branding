import { configureStore } from '@reduxjs/toolkit';
import editorReducer from './editorSlice';

export const store = configureStore({
  reducer: {
    editor: editorReducer,
    // Add other reducers here if needed later
  },
  // Optional: Add middleware, enhancers here
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch; 