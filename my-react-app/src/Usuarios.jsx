import { useEffect, useState } from "react";
import api from "./Services/api";
import "./Usuario.css";
import RegistrarUsuarios from "./RegistrarUsuarios";
import { useAuth } from "./AuthContext";

function Usuarios() {
  const { isLoggedIn, isAdmin } = useAuth();
  const [usuarios, setUsuarios] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [usuarioSeleccionado, setUsuarioSeleccionado] = useState(null);
  const [mensaje, setMensaje] = useState("");
  const [error, setError] = useState("");

  const obtenerUsuarios = async () => {
    try {
      setCargando(true);
      setError("");
      const response = await api.get("/usuarios");
      setUsuarios(Array.isArray(response.data) ? response.data : []);
    } catch (err) {
      console.error("Error al obtener usuarios:", err);
      setError(err.response?.data?.mensaje || "No se pudieron cargar los usuarios.");
    } finally {
      setCargando(false);
    }
  };

  const removeUsuario = async (id) => {
    try {
      await api.delete(`/usuarios/${id}`);
      setMensaje("Usuario eliminado correctamente.");
      setError("");
      if (usuarioSeleccionado?.id === id) {
        setUsuarioSeleccionado(null);
      }
      obtenerUsuarios();
    } catch (err) {
      console.error("Error al eliminar usuario:", err);
      setMensaje("");
      setError(err.response?.data?.mensaje || "No se pudo eliminar el usuario.");
    }
  };

  useEffect(() => {
    if (!isAdmin) {
      setCargando(false);
      return;
    }

    obtenerUsuarios();
  }, [isAdmin]);

  if (!isLoggedIn) {
    return (
      <div className="usuariosDiv">
        <h1>Usuarios</h1>
        <p>Inicia sesion para ver esta seccion.</p>
      </div>
    );
  }

  if (!isAdmin) {
    return (
      <div className="usuariosDiv">
        <h1>Usuarios</h1>
        <p>Solo el administrador puede ver y gestionar usuarios.</p>
      </div>
    );
  }

  if (cargando) {
    return <p className="usuariosEstado">Cargando usuarios...</p>;
  }

  return (
    <>
      <div className="ContenedorUsuarios">
        <RegistrarUsuarios
          usuarioEditado={usuarioSeleccionado}
          limpiarSeleccion={() => setUsuarioSeleccionado(null)}
          onActualizacionExitosa={(mensajeExito) => {
            setMensaje(mensajeExito || "Cambios guardados correctamente.");
            setError("");
            obtenerUsuarios();
          }}
        />
      </div>

      <div className="usuariosDiv">
        <h1>Tabla de Usuarios</h1>
        {mensaje ? <p className="usuariosMensaje">{mensaje}</p> : null}
        {error ? <p className="usuariosError">{error}</p> : null}
        <div className="usuariosTablaContenedor">
          <table className="usuariosTabla">
            <thead>
              <tr>
                <th>ID</th>
                <th>Nombre</th>
                <th>Direccion</th>
                <th>Email</th>
                <th>Password</th>
                <th>Telefono</th>
                <th>Rol</th>
                <th>Fecha de Registro</th>
                <th>Editar</th>
                <th>Eliminar</th>
              </tr>
            </thead>
            <tbody>
              {usuarios.map((usuario) => (
                <tr key={usuario.id}>
                  <td>{usuario.id}</td>
                  <td>{usuario.nombre}</td>
                  <td>{usuario.direccion}</td>
                  <td>{usuario.email}</td>
                  <td>{usuario.password}</td>
                  <td>{usuario.telefono}</td>
                  <td>{usuario.rol}</td>
                  <td>
                    {usuario.fecha_registro
                      ? new Date(usuario.fecha_registro).toLocaleString()
                      : ""}
                  </td>
                  <td className="accionesCelda">
                    <button
                      type="button"
                      className="btnEditar"
                      onClick={() => {
                        setMensaje("");
                        setError("");
                        setUsuarioSeleccionado(usuario);
                      }}
                    >
                      Editar
                    </button>
                  </td>
                  <td className="accionesCelda">
                    <button
                      type="button"
                      className="btnEliminar"
                      onClick={() => removeUsuario(usuario.id)}
                    >
                      Eliminar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

export default Usuarios;
