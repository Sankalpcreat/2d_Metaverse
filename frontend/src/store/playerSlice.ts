import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Position {
  x: number;
  y: number;
}

interface PlayerState {
  id: string;
  username: string;
  position: Position;
}

const initialState: PlayerState = {
  id: '',
  username: '',
  position: { x: 0, y: 0 },
};

const playerSlice = createSlice({
  name: 'player',
  initialState,
  reducers: {
    setPlayer: (state, action: PayloadAction<{ id: string; username: string }>) => {
      state.id = action.payload.id;
      state.username = action.payload.username;
    },
    updatePosition: (state, action: PayloadAction<Position>) => {
      state.position = action.payload;
    },
  },
});

export const { setPlayer, updatePosition } = playerSlice.actions;
export default playerSlice.reducer;
