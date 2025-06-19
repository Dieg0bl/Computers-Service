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
    try {
      const response = await fetch("/api/auth/recuperar", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      if (!response.ok) throw new Error("Error al enviar correo de recuperación");
      setToast({ message: "Correo de recuperación enviado", type: "success" });
    } catch (err) {
      setToast({ message: err.message || "Error inesperado", type: "error" });
    } finally {
      setLoading(false);
    }
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
