import { useEffect, useState } from "react";
import "./RegistrarUsuarios.css";
import api from "./Services/api";

const initialUserForm = {
  nombre: "",
  direccion: "",
  telefono: "",
  email: "",
  password: "",
  rol: "cliente",
};

function RegistrarUsuarios({ usuarioEditado, limpiarSeleccion, onActualizacionExitosa }) {
  const [formulario, setFormulario] = useState(initialUserForm);
  const [mensaje, setMensaje] = useState("");

  const resetForm = () => {
    setFormulario(initialUserForm);
  };

  useEffect(() => {
    if (usuarioEditado) {
      setFormulario({
        nombre: usuarioEditado.nombre || "",
        direccion: usuarioEditado.direccion || "",
        telefono: usuarioEditado.telefono || "",
        email: usuarioEditado.email || "",
        password: "",
        rol: usuarioEditado.rol || "cliente",
      });
      setMensaje("");
      return;
    }

    resetForm();
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

    if (usuarioEditado && !nuevoUsuario.password) {
      delete nuevoUsuario.password;
    }

    try {
      if (usuarioEditado) {
        await api.put(`/usuarios/${usuarioEditado.id}`, nuevoUsuario);
        setMensaje("Usuario actualizado con exito.");
        if (limpiarSeleccion) {
          limpiarSeleccion();
        }
        if (onActualizacionExitosa) {
          onActualizacionExitosa("Usuario actualizado correctamente.");
        }
      } else {
        await api.post("/usuarios", nuevoUsuario);
        setMensaje("Usuario registrado con exito.");
        resetForm();
        if (onActualizacionExitosa) {
          onActualizacionExitosa("Usuario registrado correctamente.");
        }
      }
    } catch (error) {
      console.error("Error al registrar usuario:", error);
      setMensaje(error.response?.data?.mensaje || "Error al procesar la solicitud.");
    }
  };

  const cancelarEdicion = () => {
    if (limpiarSeleccion) {
      limpiarSeleccion();
    }
    resetForm();
    setMensaje("Edicion cancelada.");
  };

  return (
    <div>
      <div className="divForm">
        <h1 className="h1">{usuarioEditado ? "Editar Usuario" : "Registrar Usuario"}</h1>
        {mensaje ? <p className="usuariosMensaje">{mensaje}</p> : null}
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
            placeholder={usuarioEditado ? "Deja vacio para conservar la actual" : ""}
            required={!usuarioEditado}
          />
          <label>Rol:</label>
          <select name="rol" value={formulario.rol} onChange={handleChange} required>
            <option value="cliente">cliente</option>
            <option value="admin">admin</option>
          </select>
          <div className="accionesFormularioUsuarios">
            <button type="submit" name="registrar">
              {usuarioEditado ? "Actualizar" : "Registrar"}
            </button>
            {usuarioEditado ? (
              <button type="button" className="btnCancelarUsuario" onClick={cancelarEdicion}>
                Cancelar
              </button>
            ) : null}
          </div>
        </form>
      </div>
    </div>
  );
}

export default RegistrarUsuarios;
