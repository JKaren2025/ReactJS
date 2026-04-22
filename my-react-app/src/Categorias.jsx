import { useEffect, useState } from "react";
import "./Categorias.css";
import { useAuth } from "./AuthContext";
import api from "./Services/api";

function Categorias() {
  const { isAdmin, isLoggedIn } = useAuth();
  const [categorias, setCategorias] = useState([]);
  const [nombre, setNombre] = useState("");
  const [categoriaEditando, setCategoriaEditando] = useState(null);
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
    cargarCategorias();
  }, []);

  const resetForm = () => {
    setNombre("");
    setCategoriaEditando(null);
  };

  const guardarCategoria = async (e) => {
    e.preventDefault();

    if (!isAdmin) {
      return;
    }

    try {
      setMensaje("");
      setError("");

      if (categoriaEditando) {
        await api.put(`/categorias/${categoriaEditando.id}`, { nombre });
        setMensaje("Categoria actualizada correctamente.");
      } else {
        await api.post("/categorias", { nombre });
        setMensaje("Categoria creada correctamente.");
      }

      resetForm();
      cargarCategorias();
    } catch (err) {
      console.error("Error al guardar categoria:", err);
      setError(err.response?.data?.mensaje || "No se pudo guardar la categoria.");
    }
  };

  const eliminarCategoria = async (id) => {
    try {
      setMensaje("");
      setError("");
      await api.delete(`/categorias/${id}`);
      setMensaje("Categoria eliminada correctamente.");
      if (categoriaEditando?.id === id) {
        resetForm();
      }
      cargarCategorias();
    } catch (err) {
      console.error("Error al eliminar categoria:", err);
      setError(err.response?.data?.mensaje || "No se pudo eliminar la categoria.");
    }
  };

  const iniciarEdicion = (categoria) => {
    setCategoriaEditando(categoria);
    setNombre(categoria.nombre || "");
    setMensaje("");
    setError("");
  };

  return (
    <section className="categoriasSection">
      <div className="categoriasPanel">
        <header className="categoriasHeader">
          <h1>Categorias</h1>
          <p className="categoriasSubtexto">
            {isAdmin
              ? "Como administrador puedes crear, editar y eliminar categorias."
              : isLoggedIn
                ? "Como cliente solo puedes consultar las categorias disponibles."
                : "Consulta las categorias disponibles del catalogo."}
          </p>
        </header>

        <div className="categoriasContenido">
          {isAdmin ? (
            <article className="categoriaCard categoriaFormCard">
              <h3>{categoriaEditando ? "Editar Categoria" : "Nueva Categoria"}</h3>
              <form className="categoriaForm" onSubmit={guardarCategoria}>
                <input
                  type="text"
                  placeholder="Nombre de la categoria"
                  value={nombre}
                  onChange={(e) => setNombre(e.target.value)}
                  required
                />
                <div className="categoriaFormAcciones">
                  <button type="submit">
                    {categoriaEditando ? "Actualizar" : "Crear"}
                  </button>
                  {categoriaEditando ? (
                    <button type="button" className="btnSecundarioCategoria" onClick={resetForm}>
                      Cancelar
                    </button>
                  ) : null}
                </div>
              </form>
            </article>
          ) : null}

          {mensaje ? <p className="categoriasMensaje">{mensaje}</p> : null}
          {error ? <p className="categoriasError">{error}</p> : null}
          {cargando ? <p className="categoriasCarga">Cargando categorias...</p> : null}

          {!cargando ? (
            categorias.length > 0 ? (
              <div className="categoriasLista">
                {categorias.map((categoria) => (
                  <article key={categoria.id} className="categoriaCard categoriaItemCard">
                    <h3>{categoria.nombre}</h3>
                    <p>ID: {categoria.id}</p>
                    <p>
                      Productos: {Array.isArray(categoria.productos) ? categoria.productos.length : 0}
                    </p>
                    {isAdmin ? (
                      <div className="categoriaAcciones">
                        <button
                          type="button"
                          className="btnEditarCategoria"
                          onClick={() => iniciarEdicion(categoria)}
                        >
                          Editar
                        </button>
                        <button
                          type="button"
                          className="btnEliminarCategoria"
                          onClick={() => eliminarCategoria(categoria.id)}
                        >
                          Eliminar
                        </button>
                      </div>
                    ) : null}
                  </article>
                ))}
              </div>
            ) : (
              <p className="categoriasCarga">No hay categorias registradas.</p>
            )
          ) : null}
        </div>
      </div>
    </section>
  );
}

export default Categorias;
