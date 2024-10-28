import { configureStore } from '@reduxjs/toolkit';
import playerReducer from './playerSlice';
import authReducer from './authSlice';
import gameReducer from './gameSlice';


// Create the Redux store and combine reducers
const store = configureStore({
  reducer: {
    player: playerReducer,   
    auth: authReducer,
    game: gameReducer,
  },
});

// Types for the store's state and dispatch function

// Infer the state from the combined reducers
export type RootState = ReturnType<typeof store.getState>;
 // Infer the dispatch type from the store
export type AppDispatch = typeof store.dispatch;

export default store;
