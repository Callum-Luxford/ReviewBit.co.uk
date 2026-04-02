import { createContext, useState, useEffect } from "react";
import { getMe } from "../api/auth";
import { login as loginApi } from "../api/auth";

export const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [business, setBusiness] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const initializeAuth = async () => {
      const jwtToken = localStorage.getItem("reviewbitToken");

      if (!jwtToken) {
        setLoading(false);
        return;
      }

      setToken(jwtToken);

      try {
        const result = await getMe(jwtToken);
        setBusiness(result.business);
      } catch (error) {
        localStorage.removeItem("reviewbitToken");
        setToken(null);
        setBusiness(null);
      } finally {
        setLoading(false);
      }
    };

    initializeAuth();
  }, []);

  const login = async (credentials) => {
    try {
      const result = await loginApi(credentials);
      localStorage.setItem("reviewbitToken", result.token);
      setToken(result.token);
      setBusiness(result.business);
      return result.business;
    } catch (error) {
      throw error;
    }
  };

  return (
    <AuthContext.Provider value={{ business, token, loading, login }}>
      {children}
    </AuthContext.Provider>
  );
}
