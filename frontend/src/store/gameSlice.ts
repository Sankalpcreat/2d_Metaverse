import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface GameState {
  roomId: string;
  players: { [id: string]: { x: number; y: number } };
}

const initialState: GameState = {
  roomId: 'room1',
  players: {},
};

const gameSlice = createSlice({
  name: 'game',
  initialState,
  reducers: {
    setRoomId: (state, action: PayloadAction<string>) => {
      state.roomId = action.payload;
    },
    updatePlayerPosition: (state, action: PayloadAction<{ id: string; x: number; y: number }>) => {
      const { id, x, y } = action.payload;
      state.players[id] = { x, y };
    },
  },
});

export const { setRoomId, updatePlayerPosition } = gameSlice.actions;
export default gameSlice.reducer;
