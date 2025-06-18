import React, { useState } from 'react';
import InputField from '../../components/InputField';
import Toast from '../../components/Toast';

const initialForm = { nombre: '', direccion: '', telefono: '', empleados: '' };

const TiendasCRUD = () => {
  const [tiendas, setTiendas] = useState([]);
  const [form, setForm] = useState(initialForm);
  const [editIndex, setEditIndex] = useState(null);
  const [toast, setToast] = useState({ message: '', type: 'info' });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.nombre || !form.direccion || !form.telefono || !form.empleados) {
      setToast({ message: 'Completa todos los campos', type: 'error' });
      return;
    }
    if (editIndex !== null) {
      const updated = tiendas.map((t, i) => (i === editIndex ? form : t));
      setTiendas(updated);
      setToast({ message: 'Tienda actualizada', type: 'success' });
    } else {
      setTiendas([...tiendas, form]);
      setToast({ message: 'Tienda agregada', type: 'success' });
    }
    setForm(initialForm);
    setEditIndex(null);
  };

  const handleEdit = (idx) => {
    setForm(tiendas[idx]);
    setEditIndex(idx);
  };

  const handleDelete = (idx) => {
    if (window.confirm('¿Eliminar esta tienda?')) {
      setTiendas(tiendas.filter((_, i) => i !== idx));
      setToast({ message: 'Tienda eliminada', type: 'success' });
      if (editIndex === idx) {
        setForm(initialForm);
        setEditIndex(null);
      }
    }
  };

  return (
    <div className="max-w-2xl mx-auto py-8">
      <h2 className="text-2xl font-bold mb-4">Gestión de Tiendas</h2>
      <form onSubmit={handleSubmit} className="bg-white p-4 rounded shadow mb-6">
        <InputField label="Nombre" name="nombre" value={form.nombre} onChange={handleChange} required />
        <InputField label="Dirección" name="direccion" value={form.direccion} onChange={handleChange} required />
        <InputField label="Teléfono" name="telefono" value={form.telefono} onChange={handleChange} required />
        <InputField label="Cantidad de empleados" name="empleados" type="number" value={form.empleados} onChange={handleChange} required />
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded mt-2">
          {editIndex !== null ? 'Actualizar' : 'Agregar'}
        </button>
        {editIndex !== null && (
          <button type="button" className="ml-2 text-gray-600 underline" onClick={() => { setForm(initialForm); setEditIndex(null); }}>
            Cancelar edición
          </button>
        )}
      </form>
      <table className="w-full bg-white rounded shadow">
        <thead>
          <tr className="bg-gray-100">
            <th className="p-2">Nombre</th>
            <th className="p-2">Dirección</th>
            <th className="p-2">Teléfono</th>
            <th className="p-2">Empleados</th>
            <th className="p-2">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {tiendas.length === 0 ? (
            <tr><td colSpan="5" className="text-center p-4">Sin tiendas registradas</td></tr>
          ) : (
            tiendas.map((t, i) => (
              <tr key={i}>
                <td className="p-2">{t.nombre}</td>
                <td className="p-2">{t.direccion}</td>
                <td className="p-2">{t.telefono}</td>
                <td className="p-2">{t.empleados}</td>
                <td className="p-2">
                  <button className="text-blue-600 mr-2" onClick={() => handleEdit(i)}>Editar</button>
                  <button className="text-red-500" onClick={() => handleDelete(i)}>Eliminar</button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
      <a href="/dashboard" className="block mt-6 text-blue-600 hover:underline">Volver al dashboard</a>
      <Toast message={toast.message} type={toast.type} onClose={() => setToast({ message: '', type: 'info' })} />
    </div>
  );
};

export default TiendasCRUD;
