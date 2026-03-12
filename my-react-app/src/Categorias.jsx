import { useEffect, useState } from "react";
import "./Categorias.css";
import { useAuth } from "./AuthContext";

const CATEGORIES_ENDPOINT = "categories.php";

function Categorias() {
  const { isLoggedIn } = useAuth();
  const [categorias, setCategorias] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!isLoggedIn) {
      setCargando(false);
      return;
    }

    const controller = new AbortController();
    const cargarCategorias = async () => {
      try {
        setCargando(true);
        setError("");
        const baseUrl = import.meta.env.VITE_MEALDB_API;
        if (!baseUrl) {
          setError("Falta configurar la API de categorias.");
          return;
        }
        const response = await fetch(`${baseUrl}/${CATEGORIES_ENDPOINT}`, {
          signal: controller.signal,
        });
        if (!response.ok) {
          throw new Error("No se pudo obtener las categorias");
        }
        const data = await response.json();
        setCategorias(Array.isArray(data.categories) ? data.categories : []);
      } catch (err) {
        if (err.name !== "AbortError") {
          setError("Error al cargar las categorias.");
        }
      } finally {
        setCargando(false);
      }
    };

    cargarCategorias();

    return () => controller.abort();
  }, [isLoggedIn]);

  if (!isLoggedIn) {
    return (
      <section className="categoriasSection">
        <h1>Categorias</h1>
        <p>Inicia sesion para ver las categorias.</p>
      </section>
    );
  }

  return (
    <section className="categoriasSection">
      <header className="categoriasHeader">
        <h1>Categorias</h1>
        <p>Explora las categorias de recetas disponibles.</p>
      </header>
      {cargando ? <p>Cargando categorias...</p> : null}
      {error ? <p className="categoriasError">{error}</p> : null}
      {!cargando && !error ? (
        <div className="categoriasGrid">
          {categorias.map((categoria) => (
            <article key={categoria.idCategory} className="categoriaCard">
              <div className="categoriaImagen">
                <img src={categoria.strCategoryThumb} alt={categoria.strCategory} />
              </div>
              <div className="categoriaInfo">
                <h3>{categoria.strCategory}</h3>
                <p>{categoria.strCategoryDescription}</p>
              </div>
            </article>
          ))}
        </div>
      ) : null}
    </section>
  );
}

export default Categorias;
