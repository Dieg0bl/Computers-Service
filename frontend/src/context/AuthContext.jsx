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
      setUser({ email, role: email === "admin@demo.com" ? "ADMIN_USER" : "BASIC_USER", nombre: email.split('@')[0], password });
      setLoading(false);
    }, 800);
  };

  const editProfile = (newData) => {
    setUser((prev) => ({ ...prev, ...newData }));
  };

  const changePassword = (newPassword) => {
    setUser((prev) => ({ ...prev, password: newPassword }));
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading, editProfile, changePassword }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
