import { useEffect, useState } from "react";
import api from "./Services/api";
import "./Productos.css";
import RegistrarProductos from "./RegistrarProductos";
import { useAuth } from "./AuthContext";

function Productos({ chVista }) {
  const { isLoggedIn, isAdmin } = useAuth();
  const [productoSeleccionado, setProductoSeleccionado] = useState(null);
  const [actualizarLista, setActualizarLista] = useState(0);
  const [mensaje, setMensaje] = useState("");
  const [error, setError] = useState("");

  const limpiarSeleccion = () => setProductoSeleccionado(null);

  const manejarActualizacionExitosa = (mensajeExito) => {
    setActualizarLista((valor) => valor + 1);
    setMensaje(mensajeExito || "Cambios guardados correctamente.");
    setError("");
    limpiarSeleccion();
  };

  const manejarAgregarCarrito = async (producto) => {
    if (!isLoggedIn) {
      if (typeof chVista === "function") {
        chVista("Login");
      }
      return;
    }

    try {
      await api.post("/carritos/agregar-producto", {
        id_producto: producto.id,
        cantidad: 1,
      });

      setError("");
      setMensaje(`\"${producto.nombre}\" se agrego a tu carrito.`);
    } catch (err) {
      console.error("Error al agregar al carrito:", err);
      setMensaje("");
      setError(err.response?.data?.mensaje || "No se pudo agregar el producto al carrito.");
    }
  };

  return (
    <section className="productoDiv">
      <h1>{isAdmin ? "Gestion de Productos" : "Catalogo de Productos"}</h1>
      <p className="productoSubtexto">
        {isAdmin
          ? "Como administrador puedes registrar, editar y eliminar productos del catalogo."
          : "Explora los productos disponibles y agrega los que quieras a tu carrito."}
      </p>

      {mensaje ? <p className="productoMensaje">{mensaje}</p> : null}
      {error ? <p className="productoError">{error}</p> : null}

      {isAdmin ? (
        <RegistrarProductos
          productoEditado={productoSeleccionado}
          limpiarSeleccion={limpiarSeleccion}
          onActualizacionExitosa={manejarActualizacionExitosa}
        />
      ) : null}

      <ProductoLista
        onEditar={(producto) => {
          setProductoSeleccionado(producto);
          setMensaje("");
          setError("");
        }}
        actualizarLista={actualizarLista}
        isAdmin={isAdmin}
        isLoggedIn={isLoggedIn}
        onAgregarCarrito={manejarAgregarCarrito}
        onEliminado={() => manejarActualizacionExitosa("Producto eliminado correctamente.")}
        onError={(mensajeError) => {
          setMensaje("");
          setError(mensajeError);
        }}
      />
    </section>
  );
}

function ProductoLista({
  onEditar,
  actualizarLista,
  isAdmin,
  isLoggedIn,
  onAgregarCarrito,
  onEliminado,
  onError,
}) {
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const obtenerProductos = async () => {
    try {
      setLoading(true);
      setError("");
      const response = await api.get("/productos");
      setProductos(Array.isArray(response.data) ? response.data : []);
    } catch (err) {
      console.error("Error al obtener productos:", err);
      setError("No se pudieron cargar los productos.");
    } finally {
      setLoading(false);
    }
  };

  const removeProducto = async (id) => {
    try {
      await api.delete(`/productos/${id}`);
      await obtenerProductos();
      onEliminado();
    } catch (err) {
      console.error("Error al eliminar producto:", err);
      const mensajeError = err.response?.data?.mensaje || "No se pudo eliminar el producto.";
      setError(mensajeError);
      onError(mensajeError);
    }
  };

  useEffect(() => {
    obtenerProductos();
  }, [actualizarLista]);

  if (loading) {
    return <p className="productoEstado">Cargando productos...</p>;
  }

  if (error) {
    return <p className="productoEstado">{error}</p>;
  }

  if (productos.length === 0) {
    return <p className="productoEstado">No hay productos registrados.</p>;
  }

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
          <p className="productoDescripcion">{producto.descripcion}</p>
          <p className="productoMeta">
            Categoria: {producto.categoria?.nombre || `Categoria #${producto.id_categoria}`}
          </p>
          <p className="productoMeta">Stock: {producto.stock}</p>
          <p className="productoPrecio">${producto.precio}</p>
          <div className="productoBotones">
            {isAdmin ? (
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
            ) : (
              <button
                type="button"
                className="btnAnadir"
                onClick={() => onAgregarCarrito(producto)}
              >
                {isLoggedIn ? "Agregar al carrito" : "Inicia sesion para comprar"}
              </button>
            )}
          </div>
        </article>
      ))}
    </section>
  );
}

export default Productos;
