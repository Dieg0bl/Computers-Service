import { useState } from "react";
import InputField from "../components/InputField";
import Toast from "../components/Toast";

export default function Registro() {
  const [form, setForm] = useState({ email: "", password: "", nombre: "" });
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState({ message: "", type: "info" });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    // Aquí iría la llamada real a la API
    setTimeout(() => {
      setToast({ message: "Usuario registrado correctamente", type: "success" });
      setLoading(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded shadow-md w-full max-w-sm">
        <h2 className="text-2xl font-bold mb-6 text-center">Registro (solo admin)</h2>
        <InputField label="Nombre" name="nombre" value={form.nombre} onChange={handleChange} required autoFocus />
        <InputField label="Email" name="email" type="email" value={form.email} onChange={handleChange} required />
        <InputField label="Contraseña" name="password" type="password" value={form.password} onChange={handleChange} required />
        <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition" disabled={loading}>
          {loading ? "Registrando..." : "Registrar"}
        </button>
        <div className="mt-4 text-center">
          <a href="/login" className="text-blue-500 hover:underline text-sm">Volver al login</a>
        </div>
      </form>
      <Toast message={toast.message} type={toast.type} onClose={() => setToast({ message: "", type: "info" })} />
    </div>
  );
}
