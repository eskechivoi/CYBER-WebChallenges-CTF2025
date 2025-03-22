import React, { createContext, useState, useEffect, useCallback } from "react";
import { jwtDecode } from "jwt-decode";

interface User {
  id: string;
  role: string;
}

interface AuthContextType {
  user: User | null;
  token: string | null;
  login: (token: string) => void;
  logout: () => void;
  getRole: () => string | null;
  getToken: () => string | null;
}

export const AuthContext = createContext<AuthContextType>({
  user: null,
  token: null,
  login: () => {},
  logout: () => {},
  getRole: () => null,
  getToken: () => null,
});

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);

  const validateToken = useCallback((storedToken: string): boolean => {
    try {
      const decoded = jwtDecode<User & { exp: number }>(storedToken);
      return decoded.exp * 1000 > Date.now();
    } catch (error) {
      console.error("Error al validar el token:", error);
      return false;
    }
  }, []);

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken && validateToken(storedToken)) {
      const decoded = jwtDecode<User>(storedToken);
      setUser(decoded);
      setToken(storedToken);
    } else {
      localStorage.removeItem("token");
    }
  }, [validateToken]);

  const login = (newToken: string) => {
    localStorage.setItem("token", newToken);
    const decoded = jwtDecode<User>(newToken);
    setUser(decoded);
    setToken(newToken);
  };

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
    setToken(null);
  };

  const getRole = (): string | null => {
    return user?.role || null;
  };

  const getToken = (): string | null => {
    return token || localStorage.getItem("token");
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      token,
      login, 
      logout,
      getRole,
      getToken
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = React.useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth debe usarse dentro de un AuthProvider');
  }
  return context;
};
