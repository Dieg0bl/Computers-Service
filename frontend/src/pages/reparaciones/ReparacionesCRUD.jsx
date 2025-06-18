import React, { useState } from 'react';
import InputField from '../../components/InputField';
import Toast from '../../components/Toast';

const initialForm = { equipo: '', fecha: '', descripcion: '', estado: 'pendiente', tecnico: '', cierre: '' };
const estados = ['pendiente', 'en proceso', 'finalizado'];

const ReparacionesCRUD = () => {
  const [reparaciones, setReparaciones] = useState([]);
  const [form, setForm] = useState(initialForm);
  const [editIndex, setEditIndex] = useState(null);
  const [toast, setToast] = useState({ message: '', type: 'info' });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.equipo || !form.fecha || !form.descripcion || !form.tecnico) {
      setToast({ message: 'Completa todos los campos obligatorios', type: 'error' });
      return;
    }
    if (editIndex !== null) {
      const updated = reparaciones.map((r, i) => (i === editIndex ? form : r));
      setReparaciones(updated);
      setToast({ message: 'Reparación actualizada', type: 'success' });
    } else {
      setReparaciones([...reparaciones, form]);
      setToast({ message: 'Reparación agregada', type: 'success' });
    }
    setForm(initialForm);
    setEditIndex(null);
  };

  const handleEdit = (idx) => {
    setForm(reparaciones[idx]);
    setEditIndex(idx);
  };

  const handleDelete = (idx) => {
    if (window.confirm('¿Eliminar esta reparación?')) {
      setReparaciones(reparaciones.filter((_, i) => i !== idx));
      setToast({ message: 'Reparación eliminada', type: 'success' });
      if (editIndex === idx) {
        setForm(initialForm);
        setEditIndex(null);
      }
    }
  };

  return (
    <div className="max-w-2xl mx-auto py-8">
      <h2 className="text-2xl font-bold mb-4">Gestión de Reparaciones</h2>
      <form onSubmit={handleSubmit} className="bg-white p-4 rounded shadow mb-6">
        <InputField label="Equipo" name="equipo" value={form.equipo} onChange={handleChange} required />
        <InputField label="Fecha de solicitud" name="fecha" type="date" value={form.fecha} onChange={handleChange} required />
        <InputField label="Descripción" name="descripcion" value={form.descripcion} onChange={handleChange} required />
        <InputField label="Técnico asignado" name="tecnico" value={form.tecnico} onChange={handleChange} required />
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1" htmlFor="estado">Estado</label>
          <select id="estado" name="estado" value={form.estado} onChange={handleChange} className="w-full border rounded px-3 py-2">
            {estados.map(e => <option key={e} value={e}>{e}</option>)}
          </select>
        </div>
        <InputField label="Fecha de cierre" name="cierre" type="date" value={form.cierre} onChange={handleChange} />
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
            <th className="p-2">Equipo</th>
            <th className="p-2">Fecha</th>
            <th className="p-2">Descripción</th>
            <th className="p-2">Técnico</th>
            <th className="p-2">Estado</th>
            <th className="p-2">Cierre</th>
            <th className="p-2">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {reparaciones.length === 0 ? (
            <tr><td colSpan="7" className="text-center p-4">Sin reparaciones registradas</td></tr>
          ) : (
            reparaciones.map((r, i) => (
              <tr key={i}>
                <td className="p-2">{r.equipo}</td>
                <td className="p-2">{r.fecha}</td>
                <td className="p-2">{r.descripcion}</td>
                <td className="p-2">{r.tecnico}</td>
                <td className="p-2">{r.estado}</td>
                <td className="p-2">{r.cierre}</td>
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

export default ReparacionesCRUD;
