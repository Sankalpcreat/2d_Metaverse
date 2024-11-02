import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store';
import { login as loginAction, logout as logoutAction } from '../store/authSlice';
import { saveToken, clearToken } from '../utils/authUtils';

export const useAuth = () => {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);

  const login = (token: string) => {
    dispatch(loginAction(token));
    saveToken(token); 
  };

  const logout = () => {
    dispatch(logoutAction());
    clearToken(); 
  };

  return { isAuthenticated, login, logout };
};
