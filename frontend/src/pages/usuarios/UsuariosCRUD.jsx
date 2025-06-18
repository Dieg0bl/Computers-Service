import React, { useState } from 'react';
import InputField from '../../components/InputField';
import Toast from '../../components/Toast';

const initialForm = { nombre: '', email: '', rol: 'BASIC_USER', estado: 'activo' };
const roles = ['ADMIN_USER', 'BASIC_USER'];
const estados = ['activo', 'inactivo'];

const UsuariosCRUD = () => {
  const [usuarios, setUsuarios] = useState([]);
  const [form, setForm] = useState(initialForm);
  const [editIndex, setEditIndex] = useState(null);
  const [toast, setToast] = useState({ message: '', type: 'info' });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.nombre || !form.email) {
      setToast({ message: 'Completa todos los campos', type: 'error' });
      return;
    }
    if (editIndex !== null) {
      const updated = usuarios.map((u, i) => (i === editIndex ? form : u));
      setUsuarios(updated);
      setToast({ message: 'Usuario actualizado', type: 'success' });
    } else {
      setUsuarios([...usuarios, form]);
      setToast({ message: 'Usuario agregado', type: 'success' });
    }
    setForm(initialForm);
    setEditIndex(null);
  };

  const handleEdit = (idx) => {
    setForm(usuarios[idx]);
    setEditIndex(idx);
  };

  const handleDelete = (idx) => {
    if (window.confirm('¿Eliminar este usuario?')) {
      setUsuarios(usuarios.filter((_, i) => i !== idx));
      setToast({ message: 'Usuario eliminado', type: 'success' });
      if (editIndex === idx) {
        setForm(initialForm);
        setEditIndex(null);
      }
    }
  };

  return (
    <div className="max-w-2xl mx-auto py-8">
      <h2 className="text-2xl font-bold mb-4">Gestión de Usuarios</h2>
      <form onSubmit={handleSubmit} className="bg-white p-4 rounded shadow mb-6">
        <InputField label="Nombre" name="nombre" value={form.nombre} onChange={handleChange} required />
        <InputField label="Email" name="email" type="email" value={form.email} onChange={handleChange} required />
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1" htmlFor="rol">Rol</label>
          <select id="rol" name="rol" value={form.rol} onChange={handleChange} className="w-full border rounded px-3 py-2">
            {roles.map(r => <option key={r} value={r}>{r}</option>)}
          </select>
        </div>
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
            <th className="p-2">Nombre</th>
            <th className="p-2">Email</th>
            <th className="p-2">Rol</th>
            <th className="p-2">Estado</th>
            <th className="p-2">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {usuarios.length === 0 ? (
            <tr><td colSpan="5" className="text-center p-4">Sin usuarios registrados</td></tr>
          ) : (
            usuarios.map((u, i) => (
              <tr key={i}>
                <td className="p-2">{u.nombre}</td>
                <td className="p-2">{u.email}</td>
                <td className="p-2">{u.rol}</td>
                <td className="p-2">{u.estado}</td>
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

export default UsuariosCRUD;
