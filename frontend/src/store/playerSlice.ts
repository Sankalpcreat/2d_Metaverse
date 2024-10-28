import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface PlayerState {
  id: string;
  x: number;
  y: number;
}

const initialState: PlayerState = {
  id: 'player1',
  x: 100,
  y: 100,
};

const playerSlice = createSlice({
  name: 'player',
  initialState,
  reducers: {
    updatePosition: (state, action: PayloadAction<{ x: number; y: number }>) => {
      state.x = action.payload.x;
      state.y = action.payload.y;
    },
  },
});

export const { updatePosition } = playerSlice.actions;
export default playerSlice.reducer;
