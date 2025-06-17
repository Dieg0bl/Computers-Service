import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import useForm from "../hooks/useForm";
import InputField from "../components/InputField";
import Toast from "../components/Toast";

export default function Login() {
  const { login, loading } = useAuth();
  const { values, handleChange } = useForm({ email: "admin@demo.com", password: "admin" });
  const [toast, setToast] = useState({ message: "", type: "info" });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(values.email, values.password);
      setToast({ message: "Login correcto", type: "success" });
    } catch {
      setToast({ message: "Credenciales incorrectas", type: "error" });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded shadow-md w-full max-w-sm">
        <h2 className="text-2xl font-bold mb-6 text-center">Iniciar sesión</h2>
        <InputField label="Email" name="email" type="email" value={values.email} onChange={handleChange} required autoFocus />
        <InputField label="Contraseña" name="password" type="password" value={values.password} onChange={handleChange} required />
        <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition" disabled={loading}>
          {loading ? "Entrando..." : "Entrar"}
        </button>
        <div className="mt-4 text-center">
          <a href="/recuperar" className="text-blue-500 hover:underline text-sm">¿Olvidaste tu contraseña?</a>
        </div>
      </form>
      <Toast message={toast.message} type={toast.type} onClose={() => setToast({ message: "", type: "info" })} />
    </div>
  );
}
