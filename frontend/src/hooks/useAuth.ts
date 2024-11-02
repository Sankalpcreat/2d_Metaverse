import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store';
import { login as loginAction, logout as logoutAction } from '../store/authSlice';

export const useAuth = () => {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);

  const login = (token: string) => {
    dispatch(loginAction(token));
    localStorage.setItem('token', token);
  };

  const logout = () => {
    dispatch(logoutAction());
    localStorage.removeItem('token');
  };

  return { isAuthenticated, login, logout };
};
