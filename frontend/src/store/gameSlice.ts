import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// The initial state defines the default values for the game state when the application is first loaded or initialized.
interface GameState {
  room: string;       
  players: string[]; 
}

const initialState: GameState = {
  room: '',     
  players: [],       
};

export const gameSlice = createSlice({
  name: 'game',
  initialState,
  reducers: {
    // Reducer for setting the current room
    setRoom: (state, action: PayloadAction<string>) => {
      state.room = action.payload; 
    },
    // Reducer for updating the list of players
    updatePlayers: (state, action: PayloadAction<string[]>) => {
      state.players = action.payload;  
    },
  },
});

// Export the actions to be used in other parts of the application
export const { setRoom, updatePlayers } = gameSlice.actions;

export default gameSlice.reducer;
