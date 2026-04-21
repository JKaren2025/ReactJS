import { useEffect, useState } from "react";
import api from "./Services/api";
import "./Carritos.css";
import { useAuth } from "./AuthContext";

function Carritos() {
  const { isLoggedIn } = useAuth();
  const [carritos, setCarritos] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState("");
  const [abierto, setAbierto] = useState(null);

  const obtenerCarritos = async () => {
    try {
      setCargando(true);
      setError("");
      const respuestaCarritos = await api.get("/carritos");
      setCarritos(Array.isArray(respuestaCarritos.data) ? respuestaCarritos.data : []);
    } catch (err) {
      console.error("Error al obtener carritos:", err);
      setError("No se pudieron cargar los carritos.");
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
        id_usuario: carrito.id_usuario,
        total: carrito.total,
        estado: "pagado",
        fecha_creacion: carrito.fecha_creacion,
      });
      obtenerCarritos();
    } catch (err) {
      console.error("Error al actualizar carrito:", err);
      setError("No se pudo actualizar el carrito.");
    }
  };

  const eliminarCarrito = async (id) => {
    try {
      await api.delete(`/carritos/${id}`);
      obtenerCarritos();
    } catch (err) {
      console.error("Error al eliminar carrito:", err);
      setError("No se pudo eliminar el carrito.");
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

  if (cargando) return <p className="carritosEstado">Cargando carritos...</p>;
  if (error) return <p className="carritosEstado">{error}</p>;
  if (carritos.length === 0) return <p className="carritosEstado">No hay carritos para mostrar.</p>;

  return (
    <section className="carritosSection">
      <div className="carritosPanel">
        <h1>Carritos</h1>
        <div className="carritosLista">
          {carritos.map((carrito) => {
            const expandido = abierto === carrito.id;
            return (
              <article className="carritoCard" key={carrito.id}>
                <h3>Carrito #{carrito.id}</h3>
                <p>Usuario ID: {carrito.id_usuario}</p>
                <p>Fecha Creacion: {new Date(carrito.fecha_creacion).toLocaleDateString()}</p>
                <p>Total: ${carrito.total}</p>
                <p>Estado: {carrito.estado}</p>

                {expandido ? (
                  <div className="carritoDetalles">
                    <p>Nombre: {carrito.usuario?.nombre || "Sin usuario"}</p>
                    <p>Email: {carrito.usuario?.email || "Sin email"}</p>
                    <p>Telefono: {carrito.usuario?.telefono || "Sin telefono"}</p>
                  </div>
                ) : null}

                <button
                  type="button"
                  className="btnDetalles"
                  onClick={() => setAbierto(expandido ? null : carrito.id)}
                >
                  {expandido ? "Ocultar Detalles" : "Ver Detalles"}
                </button>
                <button
                  type="button"
                  className="btnComprar"
                  onClick={() => comprarCarrito(carrito)}
                  disabled={carrito.estado === "pagado"}
                >
                  Comprar
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
      </div>
    </section>
  );
}

export default Carritos;
