import { useEffect, useState } from "react";
import api from "./Services/api";
import "./Carritos.css";
import { useAuth } from "./AuthContext";

function Carritos() {
  const { isLoggedIn, isAdmin } = useAuth();
  const [carritos, setCarritos] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState("");
  const [mensaje, setMensaje] = useState("");
  const [abierto, setAbierto] = useState(null);

  const obtenerCarritos = async () => {
    try {
      setCargando(true);
      setError("");
      const respuestaCarritos = await api.get("/carritos");
      setCarritos(Array.isArray(respuestaCarritos.data) ? respuestaCarritos.data : []);
    } catch (err) {
      console.error("Error al obtener carritos:", err);
      setError(err.response?.data?.mensaje || "No se pudieron cargar los carritos.");
    } finally {
      setCargando(false);
    }
  };

  useEffect(() => {
    if (!isLoggedIn) {
      setCargando(false);
      return;
    }

    obtenerCarritos();
  }, [isLoggedIn]);

  const comprarCarrito = async (carrito) => {
    try {
      await api.put(`/carritos/${carrito.id}`, {
        estado: "pagado",
      });
      setMensaje("Carrito actualizado correctamente.");
      setError("");
      obtenerCarritos();
    } catch (err) {
      console.error("Error al actualizar carrito:", err);
      setMensaje("");
      setError(err.response?.data?.mensaje || "No se pudo actualizar el carrito.");
    }
  };

  const eliminarCarrito = async (id) => {
    try {
      await api.delete(`/carritos/${id}`);
      setMensaje("Carrito eliminado correctamente.");
      setError("");
      if (abierto === id) {
        setAbierto(null);
      }
      obtenerCarritos();
    } catch (err) {
      console.error("Error al eliminar carrito:", err);
      setMensaje("");
      setError(err.response?.data?.mensaje || "No se pudo eliminar el carrito.");
    }
  };

  const aumentarCantidadDetalle = async (detalle) => {
    try {
      await api.put(`/carrito-detalles/${detalle.id}`, {
        id_carrito: detalle.id_carrito,
        id_producto: detalle.id_producto,
        precio_unitario: detalle.precio_unitario,
        cantidad: Number(detalle.cantidad) + 1,
      });
      setMensaje("Cantidad actualizada correctamente.");
      setError("");
      obtenerCarritos();
    } catch (err) {
      console.error("Error al actualizar cantidad:", err);
      setMensaje("");
      setError(err.response?.data?.mensaje || "No se pudo actualizar la cantidad.");
    }
  };

  const eliminarDetalle = async (detalleId) => {
    try {
      await api.delete(`/carrito-detalles/${detalleId}`);
      setMensaje("Producto eliminado del carrito.");
      setError("");
      obtenerCarritos();
    } catch (err) {
      console.error("Error al eliminar producto del carrito:", err);
      setMensaje("");
      setError(err.response?.data?.mensaje || "No se pudo eliminar el producto del carrito.");
    }
  };

  if (!isLoggedIn) {
    return (
      <section className="carritosSection">
        <h1>Carritos</h1>
        <p>Inicia sesion para ver los carritos.</p>
      </section>
    );
  }

  if (cargando) {
    return <p className="carritosEstado">Cargando carritos...</p>;
  }

  return (
    <section className="carritosSection">
      <div className={`carritosPanel ${isAdmin ? "" : "carritosPanelCliente"}`}>
        <h1>{isAdmin ? "Carritos de Usuarios" : "Mi Carrito"}</h1>
        {mensaje ? <p className="carritosMensaje">{mensaje}</p> : null}
        {error ? <p className="carritosEstado">{error}</p> : null}

        {carritos.length === 0 ? (
          <p className="carritosEstado">
            {isAdmin ? "No hay carritos para mostrar." : "Aun no tienes productos en tu carrito."}
          </p>
        ) : (
          <div className={isAdmin ? "carritosLista" : "carritosListaCliente"}>
            {carritos.map((carrito) => {
              const expandido = isAdmin ? abierto === carrito.id : true;
              const detalles = Array.isArray(carrito.detalles) ? carrito.detalles : [];

              if (!isAdmin) {
                return (
                  <article className="carritoClienteCard" key={carrito.id}>
                    <div className="carritoClienteHeader">
                      <div>
                        <p className="carritoClienteEyebrow">Carrito #{carrito.id}</p>
                        <h3>{carrito.estado === "pagado" ? "Pedido realizado" : "Tu seleccion artesanal"}</h3>
                      </div>
                      <span className={`carritoEstadoChip estado-${carrito.estado}`}>
                        {carrito.estado}
                      </span>
                    </div>

                    <div className="carritoClienteResumen">
                      <div className="carritoDato">
                        <span className="carritoDatoLabel">Fecha</span>
                        <strong>{new Date(carrito.fecha_creacion).toLocaleDateString()}</strong>
                      </div>
                      <div className="carritoDato">
                        <span className="carritoDatoLabel">Productos</span>
                        <strong>{detalles.length}</strong>
                      </div>
                      <div className="carritoDato carritoDatoTotal">
                        <span className="carritoDatoLabel">Total</span>
                        <strong>${carrito.total}</strong>
                      </div>
                    </div>

                    {detalles.length > 0 ? (
                      <div className="carritoItemsGrid">
                        {detalles.map((detalle) => {
                          const producto = detalle.producto || {};
                          const editable = carrito.estado !== "pagado";

                          return (
                            <article className="carritoProductoCard" key={detalle.id}>
                              <div className="carritoProductoImagenWrap">
                                <img
                                  className="carritoProductoImagen"
                                  src={
                                    producto.imagen ||
                                    "https://via.placeholder.com/300x220?text=Sin+imagen"
                                  }
                                  alt={producto.nombre || "Producto"}
                                />
                              </div>
                              <div className="carritoProductoInfo">
                                <div className="carritoProductoTop">
                                  <h5>{producto.nombre || `Producto #${detalle.id_producto}`}</h5>
                                  <span className="carritoCategoriaPill">
                                    {producto.categoria?.nombre || "Sin categoria"}
                                  </span>
                                </div>
                                <p className="carritoProductoDescripcion">
                                  {producto.descripcion || "Producto agregado a tu carrito."}
                                </p>
                                <div className="carritoProductoMeta">
                                  <span>Cantidad: {detalle.cantidad}</span>
                                  <span>Precio: ${detalle.precio_unitario}</span>
                                  <span>
                                    Subtotal: $
                                    {(Number(detalle.precio_unitario) * Number(detalle.cantidad)).toFixed(2)}
                                  </span>
                                </div>
                              </div>
                              <div className="carritoProductoAcciones">
                                <button
                                  type="button"
                                  className="btnCantidad"
                                  onClick={() => aumentarCantidadDetalle(detalle)}
                                  disabled={!editable}
                                >
                                  Agregar 1
                                </button>
                                <button
                                  type="button"
                                  className="btnEliminarDetalle"
                                  onClick={() => eliminarDetalle(detalle.id)}
                                  disabled={!editable}
                                >
                                  Quitar
                                </button>
                              </div>
                            </article>
                          );
                        })}
                      </div>
                    ) : (
                      <p className="carritosEstado">Sin productos agregados.</p>
                    )}

                    <div className="carritoClienteFooter">
                      <button
                        type="button"
                        className="btnComprar"
                        onClick={() => comprarCarrito(carrito)}
                        disabled={carrito.estado === "pagado"}
                      >
                        {carrito.estado === "pagado" ? "Pagado" : "Comprar"}
                      </button>
                      <button
                        type="button"
                        className="btnEliminarCarrito"
                        onClick={() => eliminarCarrito(carrito.id)}
                      >
                        Eliminar Carrito
                      </button>
                    </div>
                  </article>
                );
              }

              return (
                <article className="carritoCard" key={carrito.id}>
                  <h3>Carrito #{carrito.id}</h3>
                  {isAdmin ? <p>Usuario ID: {carrito.id_usuario}</p> : null}
                  {isAdmin ? <p>Usuario: {carrito.usuario?.nombre || "Sin usuario"}</p> : null}
                  <p>Fecha Creacion: {new Date(carrito.fecha_creacion).toLocaleDateString()}</p>
                  <p>Total: ${carrito.total}</p>
                  <p>Estado: {carrito.estado}</p>

                  {expandido ? (
                    <div className="carritoDetalles">
                      {isAdmin ? (
                        <div className="carritoResumenUsuario">
                          <p>Nombre: {carrito.usuario?.nombre || "Sin usuario"}</p>
                          <p>Email: {carrito.usuario?.email || "Sin email"}</p>
                          <p>Telefono: {carrito.usuario?.telefono || "Sin telefono"}</p>
                          <p>Rol: {carrito.usuario?.rol || "Sin rol"}</p>
                        </div>
                      ) : null}

                      <h4>Productos en el carrito</h4>
                      {detalles.length > 0 ? (
                        <div className="carritoItems">
                          {detalles.map((detalle) => (
                            <div className="carritoItem" key={detalle.id}>
                              <p>{detalle.producto?.nombre || `Producto #${detalle.id_producto}`}</p>
                              <p>Cantidad: {detalle.cantidad}</p>
                              <p>Precio unitario: ${detalle.precio_unitario}</p>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <p>Sin productos agregados.</p>
                      )}
                    </div>
                  ) : null}

                  {isAdmin ? (
                    <button
                      type="button"
                      className="btnDetalles"
                      onClick={() => setAbierto(expandido ? null : carrito.id)}
                    >
                      {expandido ? "Ocultar Detalles" : "Ver Detalles"}
                    </button>
                  ) : null}
                  <button
                    type="button"
                    className="btnComprar"
                    onClick={() => comprarCarrito(carrito)}
                    disabled={carrito.estado === "pagado"}
                  >
                    {carrito.estado === "pagado"
                      ? "Pagado"
                      : isAdmin
                        ? "Marcar como pagado"
                        : "Comprar"}
                  </button>
                  <button
                    type="button"
                    className="btnEliminarCarrito"
                    onClick={() => eliminarCarrito(carrito.id)}
                  >
                    Eliminar Carrito
                  </button>
                </article>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}

export default Carritos;
