import React, { createContext, useState, useContext, useEffect } from "react";
import toast from "react-hot-toast";
import { authService } from "../services";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [loading, setLoading] = useState(true);

  // =========================
  // FETCH USER (SOURCE OF TRUTH)
  // =========================
  const fetchUser = async () => {
    try {
      const data = await authService.getMe();

      const userData = data?.user || data;

      setUser(userData);
    } catch (error) {
      console.error("Fetch user error:", error);

      localStorage.removeItem("token");
      setToken(null);
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  // =========================
  // INIT AUTH ON REFRESH
  // =========================
  useEffect(() => {
    if (token) {
      fetchUser();
    } else {
      setUser(null);
      setLoading(false);
    }
  }, [token]);

  // =========================
  // LOGIN
  // =========================
  const login = async (email, password) => {
    try {
      const data = await authService.login(email, password);

      if (!data?.token) {
        throw new Error("Invalid login response");
      }

      localStorage.setItem("token", data.token);
      setToken(data.token);

      // IMPORTANT FIX:
      // Always fetch fresh user from backend (single source of truth)
      await fetchUser();

      toast.success("Login successful!");

      return data?.user || null;
    } catch (error) {
      toast.error(error.response?.data?.message || "Login failed");
      return null;
    }
  };

  // =========================
  // REGISTER
  // =========================
  const register = async (userData) => {
    try {
      const data = await authService.register(userData);

      if (!data?.token) {
        throw new Error("Invalid register response");
      }

      localStorage.setItem("token", data.token);
      setToken(data.token);

      await fetchUser();

      toast.success("Registration successful!");

      return true;
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.message || "Registration failed");
      return false;
    }
  };

  // =========================
  // LOGOUT
  // =========================
  const logout = () => {
    authService.logout();

    localStorage.removeItem("token");
    setToken(null);
    setUser(null);

    toast.success("Logged out successfully");
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        loading,
        login,
        register,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};