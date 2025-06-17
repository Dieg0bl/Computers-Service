import { useAuth } from "../context/AuthContext";

export default function Dashboard() {
  const { user } = useAuth();
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
      <h1 className="text-3xl font-bold mb-4">Bienvenido, {user?.email}</h1>
      <p className="text-lg">Rol: <span className="font-semibold">{user?.role}</span></p>
      <div className="mt-8">
        <a href="/perfil" className="text-blue-600 hover:underline mr-4">Perfil</a>
        <a href="/logout" className="text-red-500 hover:underline">Cerrar sesión</a>
      </div>
    </div>
  );
}
