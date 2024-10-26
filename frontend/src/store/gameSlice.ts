import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface GameState {
  currentRoom: string;
  multiplayerData: any;
  gameSettings: {
    sound: boolean;
    graphicsQuality: 'low' | 'medium' | 'high';
  };
}

const initialState: GameState = {
  currentRoom: 'lobby',
  multiplayerData: null,
  gameSettings: {
    sound: true,
    graphicsQuality: 'medium',
  },
};

const gameSlice = createSlice({
  name: 'game',
  initialState,
  reducers: {
    setRoom: (state, action: PayloadAction<string>) => {
      state.currentRoom = action.payload;
    },
    updateMultiplayerData: (state, action: PayloadAction<any>) => {
      state.multiplayerData = action.payload;
    },
    updateGameSettings: (state, action: PayloadAction<Partial<GameState['gameSettings']>>) => {
      state.gameSettings = { ...state.gameSettings, ...action.payload };
    },
  },
});

export const { setRoom, updateMultiplayerData, updateGameSettings } = gameSlice.actions;
export default gameSlice.reducer;
