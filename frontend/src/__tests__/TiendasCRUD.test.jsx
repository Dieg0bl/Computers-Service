import { render, fireEvent } from '@testing-library/react';
import TiendasCRUD from '../pages/tiendas/TiendasCRUD';

test('permite agregar una tienda', () => {
  const { getByLabelText, getByText } = render(<TiendasCRUD />);
  fireEvent.change(getByLabelText(/Nombre/i), { target: { value: 'Tienda Demo' } });
  fireEvent.change(getByLabelText(/Dirección/i), { target: { value: 'Calle 123' } });
  fireEvent.change(getByLabelText(/Teléfono/i), { target: { value: '123456' } });
  fireEvent.change(getByLabelText(/Cantidad de empleados/i), { target: { value: '5' } });
  fireEvent.click(getByText(/Agregar/i));
  expect(getByText('Tienda Demo')).toBeInTheDocument();
});
