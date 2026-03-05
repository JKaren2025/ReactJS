import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import api from './Services/api';
import './RegistrarProductos.css';

function RegistrarProductos({ productoEditado, limpiarSeleccion, onActualizacionExitosa }) {
  const [productos, setProductos] = useState({
    title: '',
    price: '',
    description: '',
    category: '',
    image: '',
  });
  const [mensaje, setMensaje] = useState('');

  const handleChange = (e) => {
    setProductos({
      ...productos,
      [e.target.name]: e.target.value,
    });
  };

  // when a product is selected for editing, populate the form
  useEffect(() => {
    if (productoEditado) {
      setProductos({
        title: productoEditado.title || '',
        price: productoEditado.price || '',
        description: productoEditado.description || '',
        category: productoEditado.category || '',
        image: productoEditado.image || '',
      });
      setMensaje('');
    }
  }, [productoEditado]);

  const handSubmit = async (e) => {
    e.preventDefault();
    try {
      if (productoEditado && productoEditado.id) {
        // update existing product
        const response = await api.put(`/products/${productoEditado.id}`, productos);
        console.log('Producto actualizado:', response.data);
        setMensaje('Producto actualizado correctamente.');
        limpiarSeleccion();
      } else {
        const response = await api.post('/products', productos);
        console.log('Producto registrado:', response.data);
        setMensaje('Producto registrado correctamente.');
      }

      // clear form after submission
      setProductos({
        title: '',
        price: '',
        description: '',
        category: '',
        image: '',
      });

      // notify parent to refresh list
      onActualizacionExitosa();
    } catch (error) {
      console.error('Error al registrar o actualizar producto:', error);
    }
  };

  return (
    <div className="containerForm">
      <h2>Registrar Productos</h2>
      {mensaje && <p className="formMensaje">{mensaje}</p>}
      <form onSubmit={handSubmit}>
        <label>Titulo</label>
        <input
          type="text"
          name="title"
          value={productos.title}
          onChange={handleChange}
          required
        />
        <label>Precio</label>
        <input
          type="number"
          name="price"
          value={productos.price}
          onChange={handleChange}
          step="0.01"
          required
        />
        <label>Descripcion</label>
        <input
          type="text"
          name="description"
          value={productos.description}
          onChange={handleChange}
          required
        />
        <label>Categoria</label>
        <input
          type="text"
          name="category"
          value={productos.category}
          onChange={handleChange}
          required
        />
        <label>URL de imagen</label>
        <input
          type="text"
          name="image"
          value={productos.image}
          onChange={handleChange}
          required
        />
        <button type="submit">
          {productoEditado ? 'Actualizar Producto' : 'Registrar Producto'}
        </button>
      </form>
    </div>
  );
}

RegistrarProductos.propTypes = {
  productoEditado: PropTypes.object,
  limpiarSeleccion: PropTypes.func.isRequired,
  onActualizacionExitosa: PropTypes.func.isRequired,
};

RegistrarProductos.defaultProps = {
  productoEditado: null,
};

export default RegistrarProductos;
