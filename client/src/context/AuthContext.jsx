import React, { createContext, useContext, useState, useEffect } from 'react';
import { authService } from '../services/api';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const initializeAuth = async () => {
      const storedToken = localStorage.getItem('tripsphere_token');
      const storedUser = localStorage.getItem('tripsphere_user');

      if (storedToken && storedUser) {
        setToken(storedToken);
        try {
          setUser(JSON.parse(storedUser));
          // Verify session validity with backend
          const res = await authService.getCurrentUser();
          if (res.data && res.data.user) {
            setUser(res.data.user);
            localStorage.setItem('tripsphere_user', JSON.stringify(res.data.user));
          }
        } catch (err) {
          console.warn('Session verification fallback to cached or re-login needed', err.message);
        }
      }
      setLoading(false);
    };

    initializeAuth();
  }, []);

  const login = async (email, password) => {
    const response = await authService.login({ email, password });
    const { token: receivedToken, user: receivedUser } = response.data;
    setToken(receivedToken);
    setUser(receivedUser);
    localStorage.setItem('tripsphere_token', receivedToken);
    localStorage.setItem('tripsphere_user', JSON.stringify(receivedUser));
    return receivedUser;
  };

  const register = async (userData) => {
    const response = await authService.register(userData);
    const { token: receivedToken, user: receivedUser } = response.data;
    setToken(receivedToken);
    setUser(receivedUser);
    localStorage.setItem('tripsphere_token', receivedToken);
    localStorage.setItem('tripsphere_user', JSON.stringify(receivedUser));
    return receivedUser;
  };

  const logout = async () => {
    try {
      await authService.logout();
    } catch {
      // Ignore network errors on logout
    }
    setToken(null);
    setUser(null);
    localStorage.removeItem('tripsphere_token');
    localStorage.removeItem('tripsphere_user');
  };

  const updateUserData = (updatedUser) => {
    setUser(updatedUser);
    localStorage.setItem('tripsphere_user', JSON.stringify(updatedUser));
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        loading,
        isAuthenticated: !!token && !!user,
        isAdmin: user?.role === 'admin',
        login,
        register,
        logout,
        updateUserData,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

