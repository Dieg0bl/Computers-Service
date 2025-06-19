import React, { useState } from "react";
import Toast from "../components/Toast";

export default function Informes() {
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState({ message: "", type: "info" });
  const [pdfUrl, setPdfUrl] = useState(null);

  const handleGenerarInforme = async () => {
    setLoading(true);
    setToast({ message: "Generando informe...", type: "info" });
    setPdfUrl(null);
    try {
      const response = await fetch("/api/informes/pdf", {
        method: "GET",
        headers: {
          "Authorization": `Bearer ${localStorage.getItem("token")}`,
        },
      });
      if (!response.ok) throw new Error("Error al generar el informe");
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      setPdfUrl(url);
      setToast({ message: "Informe generado correctamente", type: "success" });
    } catch (err) {
      setToast({ message: err.message || "Error inesperado", type: "error" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-8 p-6 bg-white rounded shadow">
      <h2 className="text-xl font-bold mb-4">Generar informe PDF</h2>
      <button
        onClick={handleGenerarInforme}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-50"
        disabled={loading}
      >
        {loading ? "Generando..." : "Generar informe PDF"}
      </button>
      {pdfUrl && (
        <div className="mt-4">
          <a
            href={pdfUrl}
            download="informe.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="text-green-600 underline"
          >
            Descargar informe PDF
          </a>
        </div>
      )}
      <Toast
        message={toast.message}
        type={toast.type}
        onClose={() => setToast({ message: "", type: "info" })}
      />
    </div>
  );
}
