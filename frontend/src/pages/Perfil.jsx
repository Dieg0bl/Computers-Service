import { useAuth } from "../context/AuthContext";

export default function Perfil() {
  const { user } = useAuth();
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
      <h2 className="text-2xl font-bold mb-4">Mi perfil</h2>
      <div className="bg-white p-6 rounded shadow-md w-full max-w-md">
        <p className="mb-2"><span className="font-semibold">Email:</span> {user?.email}</p>
        <p className="mb-2"><span className="font-semibold">Rol:</span> {user?.role}</p>
        {/* Aquí se podría añadir edición de perfil y cambio de contraseña en fases siguientes */}
      </div>
      <a href="/dashboard" className="mt-6 text-blue-600 hover:underline">Volver al dashboard</a>
    </div>
  );
}
