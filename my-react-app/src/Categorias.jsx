import { useEffect, useState } from "react";
import "./Categorias.css";
import { useAuth } from "./AuthContext";
import api from "./Services/api";

function Categorias() {
  const { isLoggedIn } = useAuth();
  const [categorias, setCategorias] = useState([]);
  const [nombre, setNombre] = useState("");
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState("");
  const [mensaje, setMensaje] = useState("");

  const cargarCategorias = async () => {
    try {
      setCargando(true);
      setError("");
      const response = await api.get("/categorias");
      setCategorias(Array.isArray(response.data) ? response.data : []);
    } catch (err) {
      console.error("Error al cargar categorias:", err);
      setError("Error al cargar las categorias.");
    } finally {
      setCargando(false);
    }
  };

  useEffect(() => {
    if (!isLoggedIn) {
      setCargando(false);
      return;
    }

    cargarCategorias();
  }, [isLoggedIn]);

  const crearCategoria = async (e) => {
    e.preventDefault();
    try {
      setMensaje("");
      setError("");
      await api.post("/categorias", { nombre });
      setNombre("");
      setMensaje("Categoria creada correctamente.");
      cargarCategorias();
    } catch (err) {
      console.error("Error al crear categoria:", err);
      setError("No se pudo crear la categoria.");
    }
  };

  const eliminarCategoria = async (id) => {
    try {
      setMensaje("");
      setError("");
      await api.delete(`/categorias/${id}`);
      setMensaje("Categoria eliminada correctamente.");
      cargarCategorias();
    } catch (err) {
      console.error("Error al eliminar categoria:", err);
      setError("No se pudo eliminar la categoria.");
    }
  };

  if (!isLoggedIn) {
    return (
      <section className="categoriasSection">
        <h1>Categorias</h1>
        <p>Inicia sesion para ver y administrar categorias.</p>
      </section>
    );
  }

  return (
    <section className="categoriasSection">
      <div className="categoriasPanel">
        <header className="categoriasHeader">
          <h1>Categorias</h1>
        </header>

        <div className="categoriasContenido">
          <article className="categoriaCard categoriaFormCard">
            <h3>Nueva Categoria</h3>
            <form className="categoriaForm" onSubmit={crearCategoria}>
              <input
                type="text"
                placeholder="Nombre de la categoria"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
                required
              />
              <button type="submit">Crear</button>
            </form>
          </article>

          {mensaje ? <p className="categoriasMensaje">{mensaje}</p> : null}
          {error ? <p className="categoriasError">{error}</p> : null}
          {cargando ? <p className="categoriasCarga">Cargando categorias...</p> : null}

          {!cargando ? (
            <div className="categoriasLista">
              {categorias.map((categoria) => (
                <article key={categoria.id} className="categoriaCard categoriaItemCard">
                  <h3>{categoria.nombre}</h3>
                  <p>ID: {categoria.id}</p>
                  <p>Productos: {Array.isArray(categoria.productos) ? categoria.productos.length : 0}</p>
                  <button
                    type="button"
                    className="btnEliminarCategoria"
                    onClick={() => eliminarCategoria(categoria.id)}
                  >
                    Eliminar
                  </button>
                </article>
              ))}
            </div>
          ) : null}
        </div>
      </div>
    </section>
  );
}

export default Categorias;
