import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { saveToken, clearToken } from '../utils/authUtils';

interface AuthState {
  isAuthenticated: boolean;
  token: string | null;
}

const initialState: AuthState = {
  isAuthenticated: false,
  token: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state, action: PayloadAction<string>) => {
      state.isAuthenticated = true;
      state.token = action.payload;
      saveToken(action.payload);  
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.token = null;
      clearToken(); 
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
