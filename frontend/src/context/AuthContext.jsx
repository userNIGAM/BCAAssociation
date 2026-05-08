/* eslint-disable react-refresh/only-export-components */
import { createContext, useState, useEffect, useContext, useMemo } from "react";
import api from "../api/axios";

const AuthContext = createContext(null);

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Load user from localStorage on app start
  useEffect(() => {
    const verifyAuth = async () => {
      try {
        const token = localStorage.getItem("token");

        if (!token) {
          setUser(null);
          return;
        }

        const { data } = await api.get("/auth/profile", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setUser(data);
      } catch (error) {
        console.error("Auth verification failed:", error);

        localStorage.removeItem("token");
        localStorage.removeItem("user");

        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    verifyAuth();
  }, []);

  // Login function
  const login = async (email, password) => {
    try {
      const { data } = await api.post("/auth/login", {
        email,
        password,
      });

      const userData = {
        _id: data._id,
        name: data.name,
        email: data.email,
        role: data.role,
      };

      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(userData));

      setUser(userData);

      return data;
    } catch (error) {
      console.error("Login failed:", error);
      throw error?.response?.data || error;
    }
  };

  // Logout function
  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
  };

  const value = useMemo(
    () => ({
      user,
      login,
      logout,
      loading,
      isAuthenticated: !!user,
    }),
    [user, loading],
  );

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
