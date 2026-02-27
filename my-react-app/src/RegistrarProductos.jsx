import { useState } from 'react';
import api from './Services/api';

function RegistrarProductos() {
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
    <div>
      <h1>Registrar Productos</h1>
      <form onSubmit={handSubmit}>
        <input
          type="text"
          name="title"
          placeholder="Titulo"
          value={productos.title}
          onChange={handleChange}
          required
        />
        <input
          type="number"
          name="price"
          placeholder="Precio"
          value={productos.price}
          onChange={handleChange}
          step="0.01"
          required
        />
        <input
          type="text"
          name="description"
          placeholder="Descripcion"
          value={productos.description}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="category"
          placeholder="Categoria"
          value={productos.category}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="image"
          placeholder="URL de imagen"
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
