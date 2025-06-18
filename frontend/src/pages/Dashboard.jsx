import { useAuth } from "../context/AuthContext";

export default function Dashboard() {
  const { user } = useAuth();
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
      <h1 className="text-3xl font-bold mb-4">Bienvenido, {user?.email}</h1>
      <p className="text-lg">Rol: <span className="font-semibold">{user?.role}</span></p>
      <div className="mt-8 flex flex-col gap-2 items-center">
        <a href="/perfil" className="text-blue-600 hover:underline">Perfil</a>
        <a href="/tiendas" className="text-blue-600 hover:underline">Gestión de Tiendas</a>
        {user?.role === "ADMIN_USER" && (
          <>
            <a href="/usuarios" className="text-blue-600 hover:underline">Gestión de Usuarios</a>
            <a href="/equipos" className="text-blue-600 hover:underline">Gestión de Equipos</a>
            <a href="/reparaciones" className="text-blue-600 hover:underline">Gestión de Reparaciones</a>
          </>
        )}
        <a href="/legal" className="text-gray-500 hover:underline text-sm mt-2">Aviso Legal</a>
        <a href="/logout" className="text-red-500 hover:underline mt-4">Cerrar sesión</a>
      </div>
    </div>
  );
}
