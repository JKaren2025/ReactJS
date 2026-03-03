import { useState } from 'react';
import api from './Services/api';
import './RegistrarProductos.css';

function RegistrarProductos({}) {
  const [productos, setProductos] = useState({
    title: '',
    price: '',
    description: '',
    category: '',
    image: '',
  });

  const handleChange = (e) => {
    setProductos({
      ...productos,
      [e.target.name]: e.target.value,
    });
  };

  const handSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post('/products', productos);
      console.log('Producto registrado:', response.data);
      setProductos({
        title: '',
        price: '',
        description: '',
        category: '',
        image: '',
      });
    } catch (error) {
      console.error('Error al registrar productos:', error);
    }
  };

  return (
    <div className="containerForm">
      <h2>Registrar Productos</h2>
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
        <button type="submit">Registrar Producto</button>
      </form>
    </div>
  );
}

export default RegistrarProductos;
