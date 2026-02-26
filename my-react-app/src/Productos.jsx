import { useState, useEffect } from 'react';
import api from './Services/api';
import './Productos.css'

function Productos() {
  const [productos, setProductos] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [carrito, setCarrito] = useState([]);
  // datos del formulario de registro que debe mostrarse en esta misma vista
  const [registro, setRegistro] = useState({
    titulo: '',
    price: '',
    description: '',
    category: '',
    image: '',
  });

  useEffect(() => {
    const obtenerProductos = async () => {
      try {
        const response = await api.get('/products');
        setProductos(response.data); 
      }catch (error) {
        console.error('Error al obtener los productos:', error);
      }finally {
        setCargando (false);
      }
    };
    obtenerProductos();
  }, []);

  const handleAñadirAlCarrito = (producto) => {
    setCarrito([...carrito, producto]);
    alert(`${producto.title} añadido al carrito`);
  };

  const handleEliminar = (id) => {
    setProductos(productos.filter((producto) => producto.id !== id));
  };

  const handleRegistroChange = (e) => {
    const { name, value } = e.target;
    setRegistro((prev) => ({ ...prev, [name]: value }));
  };

  const handleRegistroSubmit = (e) => {
    e.preventDefault();
    setProductos((prev) => [
      { ...registro, id: Date.now() },
      ...prev,
    ]);
    alert(`Producto "${registro.titulo}" registrado`);
    setRegistro({ titulo: '', price: '', description: '', category: '', image: '' });
  };

  if (cargando) return <p>Cargando productos...</p>;
  return (
    <div className="productoDiv">
      {/* formulario de registro embebido */}
      <section className="registroProducto">
        <h2>Registrar Productos</h2>
        <form className="registrarForm" onSubmit={handleRegistroSubmit}>
          <div className="formGroup">
            <label>Título:</label>
            <input
              type="text"
              name="titulo"
              value={registro.titulo}
              onChange={handleRegistroChange}
              required
            />
          </div>
          <div className="formGroup">
            <label>Precio:</label>
            <input
              type="number"
              name="price"
              value={registro.price}
              onChange={handleRegistroChange}
              step="0.01"
              required
            />
          </div>
          <div className="formGroup">
            <label>Descripción:</label>
            <input
              type="text"
              name="description"
              value={registro.description}
              onChange={handleRegistroChange}
              required
            />
          </div>
          <div className="formGroup">
            <label>Categoría:</label>
            <input
              type="text"
              name="category"
              value={registro.category}
              onChange={handleRegistroChange}
              required
            />
          </div>
          <div className="formGroup">
            <label>Imagen URL:</label>
            <input
              type="text"
              name="image"
              value={registro.image}
              onChange={handleRegistroChange}
              required
            />
          </div>
          <button type="submit" className="btnRegistrar">
            Registrar Producto
          </button>
        </form>
      </section>
      <h1>Catalgo Productos</h1>
      <div className="productosGrid">
        {productos.map((producto) => (
          //*Card por producto van aquí
          <div key={producto.id} className="productoCard">
            <img src={producto.image} alt={producto.title} className="productoImagen" />
            <h3>{producto.title}</h3>
            <p className="productoPrecio">${producto.price}</p>
            <div className="productoBotones">
              <button 
                className="btnAñadir" 
                onClick={() => handleAñadirAlCarrito(producto)}
              >
                Añadir al carrito
              </button>
              <button 
                className="btnEliminarProducto" 
                onClick={() => handleEliminar(producto.id)}
                title="Eliminar producto"
              >
                Eliminar
              </button>
            </div>
          </div>
          //*Card terminana aqui
        ))}
      </div>
    </div>
  );
}
export default Productos;



