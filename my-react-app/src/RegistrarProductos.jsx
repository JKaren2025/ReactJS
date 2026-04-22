import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import api from "./Services/api";
import "./RegistrarProductos.css";

const initialProductForm = {
  nombre: "",
  precio: "",
  descripcion: "",
  imagen: "",
  stock: "",
  id_categoria: "",
};

function RegistrarProductos({ productoEditado, limpiarSeleccion, onActualizacionExitosa }) {
  const [productos, setProductos] = useState(initialProductForm);
  const [categorias, setCategorias] = useState([]);
  const [mensaje, setMensaje] = useState("");

  const resetForm = () => setProductos(initialProductForm);

  const handleChange = (e) => {
    setProductos({
      ...productos,
      [e.target.name]: e.target.value,
    });
  };

  useEffect(() => {
    if (productoEditado) {
      setProductos({
        nombre: productoEditado.nombre || "",
        precio: productoEditado.precio || "",
        descripcion: productoEditado.descripcion || "",
        imagen: productoEditado.imagen || "",
        stock: productoEditado.stock || "",
        id_categoria: productoEditado.id_categoria || "",
      });
      setMensaje("");
      return;
    }

    resetForm();
  }, [productoEditado]);

  useEffect(() => {
    const obtenerCategorias = async () => {
      try {
        const response = await api.get("/categorias");
        setCategorias(Array.isArray(response.data) ? response.data : []);
      } catch (error) {
        console.error("Error al obtener categorias:", error);
      }
    };

    obtenerCategorias();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (productoEditado?.id) {
        await api.put(`/productos/${productoEditado.id}`, productos);
        setMensaje("Producto actualizado correctamente.");
        limpiarSeleccion();
        onActualizacionExitosa("Producto actualizado correctamente.");
      } else {
        await api.post("/productos", productos);
        setMensaje("Producto registrado correctamente.");
        onActualizacionExitosa("Producto registrado correctamente.");
      }

      resetForm();
    } catch (error) {
      console.error("Error al registrar o actualizar producto:", error);
      setMensaje(error.response?.data?.mensaje || "No se pudo guardar el producto.");
    }
  };

  const cancelarEdicion = () => {
    resetForm();
    limpiarSeleccion();
    setMensaje("Edicion cancelada.");
  };

  return (
    <div className="containerForm">
      <h2>{productoEditado ? "Editar Producto" : "Registrar Producto"}</h2>
      {mensaje ? <p className="formMensaje">{mensaje}</p> : null}
      <form onSubmit={handleSubmit}>
        <label>Nombre</label>
        <input
          type="text"
          name="nombre"
          value={productos.nombre}
          onChange={handleChange}
          required
        />
        <label>Precio</label>
        <input
          type="number"
          name="precio"
          value={productos.precio}
          onChange={handleChange}
          step="0.01"
          min="0"
          required
        />
        <label>Descripcion</label>
        <input
          type="text"
          name="descripcion"
          value={productos.descripcion}
          onChange={handleChange}
          required
        />
        <label>Categoria</label>
        <select
          name="id_categoria"
          value={productos.id_categoria}
          onChange={handleChange}
          required
        >
          <option value="">Selecciona una categoria</option>
          {categorias.map((categoria) => (
            <option key={categoria.id} value={categoria.id}>
              {categoria.nombre}
            </option>
          ))}
        </select>
        <label>Stock</label>
        <input
          type="number"
          name="stock"
          value={productos.stock}
          onChange={handleChange}
          min="0"
          required
        />
        <label>URL de imagen</label>
        <input
          type="text"
          name="imagen"
          value={productos.imagen}
          onChange={handleChange}
          required
        />
        <div className="formAcciones">
          <button type="submit">
            {productoEditado ? "Actualizar Producto" : "Registrar Producto"}
          </button>
          {productoEditado ? (
            <button type="button" className="btnSecundario" onClick={cancelarEdicion}>
              Cancelar
            </button>
          ) : null}
        </div>
      </form>
    </div>
  );
}

RegistrarProductos.propTypes = {
  productoEditado: PropTypes.object,
  limpiarSeleccion: PropTypes.func.isRequired,
  onActualizacionExitosa: PropTypes.func.isRequired,
};

RegistrarProductos.defaultProps = {
  productoEditado: null,
};

export default RegistrarProductos;
