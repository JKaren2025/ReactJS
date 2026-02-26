import { useEffect, useState } from 'react';
import api from './Services/api';
import './Carritos.css';

function Carritos() {
  const [carritos, setCarritos] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const obtenerDatos = async () => {
      try {
        const respuestaCarritos = await api.get('/carts');
        setCarritos(respuestaCarritos.data);
      } catch (error) {
        console.error('Error al obtener carritos:', error);
        setError('No se pudieron cargar los carritos.');
      } finally {
        setCargando(false);
      }
    };

    obtenerDatos();
  }, []);

  const handleEliminar = (id) => {
    setCarritos(carritos.filter((carrito) => carrito.id !== id));
  };

  if (cargando) return <p>Cargando carritos...</p>;
  if (error) return <p>{error}</p>;
  if (carritos.length === 0) return <p>No hay carritos para mostrar.</p>;

  return (
    <div className="carritosDiv">
      <h1>Carrito de compras</h1>
      <div className="carritosLista">
        {carritos.map((carrito) => (
          <div className="carritoCard" key={carrito.id}>
            <p className="carritoId">{carrito.id}</p>
            <p className="carritoFecha">{carrito.date}</p>

            <h3>Productos</h3>
            <ul className="productosLista">
              {carrito.products.map((item, index) => (
                <li key={`${item.productId}-${index}`} className="productoItem">
                  <span>Producto #{item.productId} - Cantidad: {item.quantity}</span>
                  <button
                    type="button"
                    className="btnEliminarProducto"
                    onClick={() => {
                      const nuevosProductos = carrito.products.filter((_, i) => i !== index);
                      setCarritos(
                        carritos.map((c) =>
                          c.id === carrito.id ? { ...c, products: nuevosProductos } : c
                        )
                      );
                    }}
                    title="Eliminar producto"
                  >
                    ✕
                  </button>
                </li>
              ))}
            </ul>

            <button type="button" className="btnComprar">
              Comprar
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Carritos;
