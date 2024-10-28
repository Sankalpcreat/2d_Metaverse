import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AuthState {
  isAuthenticated: boolean;
  token: string | null;
}
// Define the initial state (initialState) with properties isAuthenticated and token.
const initialState: AuthState = {
  isAuthenticated: false,
  token: null,
};


export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    // Action to set the authentication token
    setAuthToken: (state, action: PayloadAction<string>) => {
      state.isAuthenticated = true;
      state.token = action.payload;
    },
 // logout action resets the authentication state, clearing the token and setting isAuthenticated to false.
    logout: (state) => {
      state.isAuthenticated = false;
      state.token = null;
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
