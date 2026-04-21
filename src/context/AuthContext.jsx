import React, { createContext, useState, useContext, useEffect } from 'react';
import toast from 'react-hot-toast';
import { authService } from '../services';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState(localStorage.getItem('token'));

  useEffect(() => {
    if (token) {
      fetchUser();
    } else {
      setLoading(false);
    }
  }, [token]);

  const fetchUser = async () => {
  try {
    const data = await authService.getMe();

    setUser(data.user || data); // 👈 IMPORTANT FIX

  } catch (error) {
    console.error('Fetch user error:', error);
    localStorage.removeItem('token');
    setToken(null);
    setUser(null);
  } finally {
    setLoading(false);
  }
};

const login = async (email, password) => {
  try {
    const data = await authService.login(email, password);

    if (data?.token) {
      localStorage.setItem('token', data.token);
      setToken(data.token);
      setUser(data.user);

      toast.success('Login successful!');
      return data.user;
    }

    return null;
  } catch (error) {
    toast.error(error.response?.data?.message || 'Login failed');
    return null;
  }
};

const register = async (userData) => {
  try {
    const data = await authService.register(userData)

    if (data?.token) {
      localStorage.setItem("token", data.token)
      setToken(data.token)
      setUser(data.user)

      return true
    }

    return false
  } catch (err) {
    console.error(err)
    toast.error(err.response?.data?.message || "Registration failed")
    return false
  }
}

  const logout = () => {
    authService.logout();
    setToken(null);
    setUser(null);
    toast.success('Logged out successfully');
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout, loading, token }}>
      {children}
    </AuthContext.Provider>
  );
};