import { useEffect } from "react";

export default function Toast({ message, type = "info", onClose }) {
  useEffect(() => {
    if (!message) return;
    const timer = setTimeout(() => onClose(), 3000);
    return () => clearTimeout(timer);
  }, [message, onClose]);

  if (!message) return null;

  const color = type === "error" ? "bg-red-500" : type === "success" ? "bg-green-500" : "bg-blue-500";

  return (
    <div className={`fixed top-4 right-4 px-4 py-2 rounded text-white shadow-lg z-50 ${color}`}>
      {message}
    </div>
  );
}
