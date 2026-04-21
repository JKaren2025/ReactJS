import { useEffect, useState } from "react";
import "./RegistrarUsuarios.css";
import api from "./Services/api";

function RegistrarUsuarios({ usuarioEditado, limpiarSeleccion, onActualizacionExitosa }) {
  const [formulario, setFormulario] = useState({
    nombre: "",
    direccion: "",
    telefono: "",
    email: "",
    password: "",
    rol: "cliente",
  });

  const resetForm = () => {
    setFormulario({
      nombre: "",
      direccion: "",
      telefono: "",
      email: "",
      password: "",
      rol: "cliente",
    });
  };

  useEffect(() => {
    if (usuarioEditado) {
      setFormulario({
        nombre: usuarioEditado.nombre || "",
        direccion: usuarioEditado.direccion || "",
        telefono: usuarioEditado.telefono || "",
        email: usuarioEditado.email || "",
        password: usuarioEditado.password || "",
        rol: usuarioEditado.rol || "cliente",
      });
    } else {
      resetForm();
    }
  }, [usuarioEditado]);

  const handleChange = (e) => {
    setFormulario({
      ...formulario,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const nuevoUsuario = {
      ...formulario,
      fecha_registro: usuarioEditado?.fecha_registro || new Date().toISOString(),
    };

    try {
      if (usuarioEditado) {
        const respuesta = await api.put(`/usuarios/${usuarioEditado.id}`, nuevoUsuario);
        console.log("Usuario actualizado:", respuesta.data);
        alert("Usuario actualizado con exito");
        if (limpiarSeleccion) limpiarSeleccion();
      } else {
        const respuesta = await api.post("/usuarios", nuevoUsuario);
        console.log("Usuario registrado:", respuesta.data);
        alert("Usuario registrado con exito");
        resetForm();
      }

      if (onActualizacionExitosa) onActualizacionExitosa();
    } catch (error) {
      console.error("Error al registrar usuario:", error);
      alert("Error al procesar la solicitud");
    }
  };

  return (
    <div>
      <div className="divForm">
        <h1 className="h1">Registrar Usuarios</h1>
        <form className="formularioProductos" onSubmit={handleSubmit}>
          <label>Nombre del usuario:</label>
          <input
            type="text"
            name="nombre"
            value={formulario.nombre}
            onChange={handleChange}
            required
          />
          <label>Direccion:</label>
          <input
            type="text"
            name="direccion"
            value={formulario.direccion}
            onChange={handleChange}
            required
          />
          <label>Telefono:</label>
          <input
            type="text"
            name="telefono"
            value={formulario.telefono}
            onChange={handleChange}
            required
          />
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={formulario.email}
            onChange={handleChange}
            required
          />
          <label>Password:</label>
          <input
            type="password"
            name="password"
            value={formulario.password}
            onChange={handleChange}
            required
          />
          <label>Rol:</label>
          <select
            name="rol"
            value={formulario.rol}
            onChange={handleChange}
            required
          >
            <option value="cliente">cliente</option>
            <option value="admin">admin</option>
          </select>
          <button type="submit" name="registrar">
            {usuarioEditado ? "Actualizar" : "Registrar"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default RegistrarUsuarios;
