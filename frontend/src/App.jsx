import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "./context/AuthContext";
import Login from "./pages/Login";
import Recuperar from "./pages/Recuperar";
import Dashboard from "./pages/Dashboard";
import Perfil from "./pages/Perfil";
import Registro from "./pages/Registro";
import TiendasCRUD from "./pages/tiendas/TiendasCRUD";
import UsuariosCRUD from "./pages/usuarios/UsuariosCRUD";
import EquiposCRUD from "./pages/equipos/EquiposCRUD";
import ReparacionesCRUD from "./pages/reparaciones/ReparacionesCRUD";
import LegalNotice from "./components/Legal/LegalNotice";

function PrivateRoute({ children, roles }) {
  const { user } = useAuth();
  if (!user) return <Navigate to="/login" />;
  if (roles && !roles.includes(user.role)) return <Navigate to="/dashboard" />;
  return children;
}

function AppRoutes() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/recuperar" element={<Recuperar />} />
      <Route path="/registro" element={<Registro />} />
      <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
      <Route path="/perfil" element={<PrivateRoute><Perfil /></PrivateRoute>} />
      <Route path="/tiendas" element={<PrivateRoute roles={["ADMIN_USER","BASIC_USER"]}><TiendasCRUD /></PrivateRoute>} />
      <Route path="/usuarios" element={<PrivateRoute roles={["ADMIN_USER"]}><UsuariosCRUD /></PrivateRoute>} />
      <Route path="/equipos" element={<PrivateRoute roles={["ADMIN_USER"]}><EquiposCRUD /></PrivateRoute>} />
      <Route path="/reparaciones" element={<PrivateRoute roles={["ADMIN_USER"]}><ReparacionesCRUD /></PrivateRoute>} />
      <Route path="/legal" element={<LegalNotice />} />
      <Route path="*" element={<Navigate to="/login" />} />
    </Routes>
  );
}

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <div className="p-4">
          <h1 className="text-2xl font-bold">Computers Service</h1>
          <p>¡Bienvenido a tu app React + Vite!</p>
          <AppRoutes />
        </div>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
