import React, { useState } from 'react';
import InputField from '../../components/InputField';
import Toast from '../../components/Toast';

const initialForm = { tipo: 'Desktop', marca: '', modelo: '', serie: '', usuario: '', estado: 'activo' };
const tipos = ['Desktop', 'Laptop', 'Server'];
const estados = ['activo', 'en reparación', 'baja'];

const EquiposCRUD = () => {
  const [equipos, setEquipos] = useState([]);
  const [form, setForm] = useState(initialForm);
  const [editIndex, setEditIndex] = useState(null);
  const [toast, setToast] = useState({ message: '', type: 'info' });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.marca || !form.modelo || !form.serie || !form.usuario) {
      setToast({ message: 'Completa todos los campos', type: 'error' });
      return;
    }
    if (editIndex !== null) {
      const updated = equipos.map((eq, i) => (i === editIndex ? form : eq));
      setEquipos(updated);
      setToast({ message: 'Equipo actualizado', type: 'success' });
    } else {
      setEquipos([...equipos, form]);
      setToast({ message: 'Equipo agregado', type: 'success' });
    }
    setForm(initialForm);
    setEditIndex(null);
  };

  const handleEdit = (idx) => {
    setForm(equipos[idx]);
    setEditIndex(idx);
  };

  const handleDelete = (idx) => {
    if (window.confirm('¿Eliminar este equipo?')) {
      setEquipos(equipos.filter((_, i) => i !== idx));
      setToast({ message: 'Equipo eliminado', type: 'success' });
      if (editIndex === idx) {
        setForm(initialForm);
        setEditIndex(null);
      }
    }
  };

  return (
    <div className="max-w-2xl mx-auto py-8">
      <h2 className="text-2xl font-bold mb-4">Gestión de Equipos</h2>
      <form onSubmit={handleSubmit} className="bg-white p-4 rounded shadow mb-6">
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1" htmlFor="tipo">Tipo</label>
          <select id="tipo" name="tipo" value={form.tipo} onChange={handleChange} className="w-full border rounded px-3 py-2">
            {tipos.map(t => <option key={t} value={t}>{t}</option>)}
          </select>
        </div>
        <InputField label="Marca" name="marca" value={form.marca} onChange={handleChange} required />
        <InputField label="Modelo" name="modelo" value={form.modelo} onChange={handleChange} required />
        <InputField label="N° de Serie" name="serie" value={form.serie} onChange={handleChange} required />
        <InputField label="Usuario asignado" name="usuario" value={form.usuario} onChange={handleChange} required />
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1" htmlFor="estado">Estado</label>
          <select id="estado" name="estado" value={form.estado} onChange={handleChange} className="w-full border rounded px-3 py-2">
            {estados.map(e => <option key={e} value={e}>{e}</option>)}
          </select>
        </div>
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
            <th className="p-2">Tipo</th>
            <th className="p-2">Marca</th>
            <th className="p-2">Modelo</th>
            <th className="p-2">Serie</th>
            <th className="p-2">Usuario</th>
            <th className="p-2">Estado</th>
            <th className="p-2">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {equipos.length === 0 ? (
            <tr><td colSpan="7" className="text-center p-4">Sin equipos registrados</td></tr>
          ) : (
            equipos.map((eq, i) => (
              <tr key={i}>
                <td className="p-2">{eq.tipo}</td>
                <td className="p-2">{eq.marca}</td>
                <td className="p-2">{eq.modelo}</td>
                <td className="p-2">{eq.serie}</td>
                <td className="p-2">{eq.usuario}</td>
                <td className="p-2">{eq.estado}</td>
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

export default EquiposCRUD;
