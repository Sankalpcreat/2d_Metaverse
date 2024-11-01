import { configureStore } from '@reduxjs/toolkit';
import playerReducer from './playerSlice';
import gameReducer from './gameSlice';
import authReducer from './authSlice'

const store = configureStore({
  reducer: {
    player: playerReducer,
    auth:authReducer,
    game: gameReducer,
    
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
