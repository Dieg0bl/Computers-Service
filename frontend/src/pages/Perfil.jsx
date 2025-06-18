import { useAuth } from "../context/AuthContext";
import { useState } from "react";
import InputField from "../components/InputField";
import Toast from "../components/Toast";

export default function Perfil() {
  const { user, editProfile, changePassword } = useAuth();
  const [form, setForm] = useState({ nombre: user?.nombre || "", email: user?.email || "" });
  const [password, setPassword] = useState("");
  const [toast, setToast] = useState({ message: "", type: "info" });

  const handleProfile = (e) => {
    e.preventDefault();
    editProfile({ nombre: form.nombre, email: form.email });
    setToast({ message: "Perfil actualizado", type: "success" });
  };
  const handlePassword = (e) => {
    e.preventDefault();
    if (!password) {
      setToast({ message: "Introduce una nueva contraseña", type: "error" });
      return;
    }
    changePassword(password);
    setPassword("");
    setToast({ message: "Contraseña cambiada", type: "success" });
  };
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
      <h2 className="text-2xl font-bold mb-4">Mi perfil</h2>
      <div className="bg-white p-6 rounded shadow-md w-full max-w-md">
        <form onSubmit={handleProfile} className="mb-4">
          <InputField label="Nombre" name="nombre" value={form.nombre} onChange={e => setForm({ ...form, nombre: e.target.value })} required />
          <InputField label="Email" name="email" type="email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} required />
          <button className="bg-blue-600 text-white px-4 py-2 rounded mt-2" type="submit">Actualizar perfil</button>
        </form>
        <form onSubmit={handlePassword}>
          <InputField label="Nueva contraseña" name="password" type="password" value={password} onChange={e => setPassword(e.target.value)} required />
          <button className="bg-blue-600 text-white px-4 py-2 rounded mt-2" type="submit">Cambiar contraseña</button>
        </form>
        <p className="mt-4"><span className="font-semibold">Rol:</span> {user?.role}</p>
      </div>
      <a href="/dashboard" className="mt-6 text-blue-600 hover:underline">Volver al dashboard</a>
      <Toast message={toast.message} type={toast.type} onClose={() => setToast({ message: "", type: "info" })} />
    </div>
  );
}
