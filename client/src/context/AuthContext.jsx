import { createContext, useState, useEffect } from "react";
import { getMe } from "../api/auth";

export const AuthContext = createContext();

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

  return (
    <AuthContext.Provider value={{ business, token, loading }}>
      {children}
    </AuthContext.Provider>
  );
}
