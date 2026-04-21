import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import api from "./Services/api";
import "./RegistrarProductos.css";

function RegistrarProductos({ productoEditado, limpiarSeleccion, onActualizacionExitosa }) {
  const [productos, setProductos] = useState({
    nombre: "",
    precio: "",
    descripcion: "",
    imagen: "",
    stock: "",
    id_categoria: "",
  });
  const [categorias, setCategorias] = useState([]);
  const [mensaje, setMensaje] = useState("");

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
    }
  }, [productoEditado]);

  useEffect(() => {
    const obtenerCategorias = async () => {
      try {
        const response = await api.get("/categorias");
        setCategorias(response.data);
      } catch (error) {
        console.error("Error al obtener categorias:", error);
      }
    };

    obtenerCategorias();
  }, []);

  const handSubmit = async (e) => {
    e.preventDefault();
    try {
      if (productoEditado && productoEditado.id) {
        const response = await api.put(`/productos/${productoEditado.id}`, productos);
        console.log("Producto actualizado:", response.data);
        setMensaje("Producto actualizado correctamente.");
        limpiarSeleccion();
      } else {
        const response = await api.post("/productos", productos);
        console.log("Producto registrado:", response.data);
        setMensaje("Producto registrado correctamente.");
      }

      setProductos({
        nombre: "",
        precio: "",
        descripcion: "",
        imagen: "",
        stock: "",
        id_categoria: "",
      });

      onActualizacionExitosa();
    } catch (error) {
      console.error("Error al registrar o actualizar producto:", error);
      setMensaje("No se pudo guardar el producto. Revisa los datos.");
    }
  };

  return (
    <div className="containerForm">
      <h2>Registrar Productos</h2>
      {mensaje && <p className="formMensaje">{mensaje}</p>}
      <form onSubmit={handSubmit}>
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
        <button type="submit">
          {productoEditado ? "Actualizar Producto" : "Registrar Producto"}
        </button>
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
