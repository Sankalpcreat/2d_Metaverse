import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface PlayerState {
  x: number;
  y: number;
  username: string;
}
// Define the initial state (initialState) with the player's x, y position and username.
const initialState: PlayerState = {
  x: 0,
  y: 0,
  username: '',
};

export const playerSlice = createSlice({
  name: 'player',
  initialState,
  reducers: {
    // Action to update player position
    updatePosition: (state, action: PayloadAction<{ x: number; y: number }>) => {
      state.x = action.payload.x;
      state.y = action.payload.y;
    },
    // Action to set the player's username
    setUsername: (state, action: PayloadAction<string>) => {
      state.username = action.payload;
    },
  },
});
// setUsername action sets the player's name (useful when a player logs in or registers).
export const { updatePosition, setUsername } = playerSlice.actions;
export default playerSlice.reducer;
