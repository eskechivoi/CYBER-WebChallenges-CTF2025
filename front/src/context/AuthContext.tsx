import React, { createContext, useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";

interface User {
  id: string;
  role: string;
}

interface AuthContextType {
  user: User | null;
  login: (token: string) => void;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType>({
  user: null,
  login: () => {},
  logout: () => {},
});

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decoded = jwtDecode<User & { exp: number }>(token);
        if (decoded.exp * 1000 > Date.now()) {
          setUser(decoded);
        } else {
          localStorage.removeItem("token");
        }
      } catch (error) {
        console.error("Error al decodificar el token:", error);
      }
    }
  }, []);

  const login = (token: string) => {
    localStorage.setItem("token", token);
    setUser(jwtDecode<User>(token));
  };

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
