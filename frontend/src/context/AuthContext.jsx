import { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);

  // Simulación de login/logout para desarrollo
  const login = async (email, password) => {
    setLoading(true);
    // Aquí irá la llamada real a la API
    setTimeout(() => {
      setUser({ email, role: email === "admin@demo.com" ? "ADMIN_USER" : "BASIC_USER" });
      setLoading(false);
    }, 800);
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
