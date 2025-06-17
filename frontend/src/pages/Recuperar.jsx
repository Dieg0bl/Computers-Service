import { useState } from "react";
import InputField from "../components/InputField";
import Toast from "../components/Toast";

export default function Recuperar() {
  const [email, setEmail] = useState("");
  const [toast, setToast] = useState({ message: "", type: "info" });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    // Aquí iría la llamada real a la API
    setTimeout(() => {
      setToast({ message: "Si el email existe, se ha enviado un enlace de recuperación", type: "success" });
      setLoading(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded shadow-md w-full max-w-sm">
        <h2 className="text-2xl font-bold mb-6 text-center">Recuperar contraseña</h2>
        <InputField label="Email" name="email" type="email" value={email} onChange={e => setEmail(e.target.value)} required autoFocus />
        <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition" disabled={loading}>
          {loading ? "Enviando..." : "Enviar enlace"}
        </button>
        <div className="mt-4 text-center">
          <a href="/login" className="text-blue-500 hover:underline text-sm">Volver al login</a>
        </div>
      </form>
      <Toast message={toast.message} type={toast.type} onClose={() => setToast({ message: "", type: "info" })} />
    </div>
  );
}
