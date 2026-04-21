import { useEffect, useState } from "react";
import api from "./Services/api";
import "./Productos.css";
import RegistrarProductos from "./RegistrarProductos";
import { useAuth } from "./AuthContext";

function Productos() {
  const { isLoggedIn } = useAuth();
  const [productoSeleccionado, setProductoSeleccionado] = useState(null);
  const [actualizarLista, setActualizarLista] = useState(0);

  const limpiarSeleccion = () => setProductoSeleccionado(null);
  const onActualizacionExitosa = () => setActualizarLista((valor) => valor + 1);

  return (
    <div className="productoDiv">
      {isLoggedIn ? <h1>Catalogo de Productos</h1> : null}
      {isLoggedIn ? (
        <RegistrarProductos
          productoEditado={productoSeleccionado}
          limpiarSeleccion={limpiarSeleccion}
          onActualizacionExitosa={onActualizacionExitosa}
        />
      ) : null}
      <Producto
        onEditar={setProductoSeleccionado}
        actualizarLista={actualizarLista}
        isLoggedIn={isLoggedIn}
      />
    </div>
  );
}

function Producto({ onEditar, actualizarLista, isLoggedIn }) {
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(true);

  const obtenerProductos = async () => {
    try {
      const response = await api.get("/productos");
      setProductos(response.data);
    } catch (error) {
      console.error("Error al obtener productos:", error);
    } finally {
      setLoading(false);
    }
  };

  const removeProducto = async (id) => {
    try {
      await api.delete(`/productos/${id}`);
      obtenerProductos();
    } catch (error) {
      console.error("Error al eliminar producto:", error);
    }
  };

  useEffect(() => {
    obtenerProductos();
  }, [actualizarLista]);

  if (loading) return <p>Cargando...</p>;

  return (
    <section className="productosGrid">
      {productos.map((producto) => (
        <article key={producto.id} className="productoCard">
          <img
            className="productoImagen"
            src={producto.imagen || "https://via.placeholder.com/300x220?text=Sin+imagen"}
            alt={producto.nombre}
          />
          <h3>{producto.nombre}</h3>
          <p>{producto.descripcion}</p>
          <p>{producto.categoria?.nombre || `Categoria #${producto.id_categoria}`}</p>
          <p>Stock: {producto.stock}</p>
          <p className="productoPrecio">${producto.precio}</p>
          <div className="productoBotones">
            <button type="button" className="btnAnadir">Anadir</button>
            {isLoggedIn ? (
              <>
                <button
                  type="button"
                  className="btnEditarProducto"
                  onClick={() => onEditar(producto)}
                >
                  Editar
                </button>
                <button
                  type="button"
                  className="btnEliminarProducto"
                  onClick={() => removeProducto(producto.id)}
                >
                  Eliminar
                </button>
              </>
            ) : null}
          </div>
        </article>
      ))}
    </section>
  );
}

export default Productos;
