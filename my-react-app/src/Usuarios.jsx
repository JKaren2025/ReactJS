import { useEffect, useState } from "react";
import api from "./Services/api";
import "./Usuario.css";
import RegistrarUsuarios from "./RegistrarUsuarios";
import { useAuth } from "./AuthContext";

function Usuarios() {
  const { isLoggedIn } = useAuth();
  const [usuarios, setUsuarios] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [usuarioSeleccionado, setUsuarioSeleccionado] = useState(null);

  const obtenerUsuarios = async () => {
    try {
      const response = await api.get("/users");
      setUsuarios(Array.isArray(response.data) ? response.data : []);
    } catch (error) {
      console.error("Error al obtener usuarios:", error);
    } finally {
      setCargando(false);
    }
  };

  const removeUsuario = async (id) => {
    try {
      await api.delete(`/users/${id}`);
      obtenerUsuarios();
    } catch (error) {
      console.error("Error al eliminar usuario:", error);
    }
  };

  useEffect(() => {
    obtenerUsuarios();
  }, []);

  if (!isLoggedIn) {
    return (
      <div className="usuariosDiv">
        <h1>Usuarios</h1>
        <p>Inicia sesion para ver y administrar usuarios.</p>
      </div>
    );
  }

  if (cargando) return <p>Cargando usuarios...</p>;

  return (
    <>
      <div className="ContenedorUsuarios">
        <RegistrarUsuarios
          usuarioEditado={usuarioSeleccionado}
          limpiarSeleccion={() => setUsuarioSeleccionado(null)}
          onActualizacionExitosa={obtenerUsuarios}
        />
      </div>

      <div className="usuariosDiv">
        <h1>Tabla de Usuarios</h1>
        <div className="usuariosTablaContenedor">
          <table className="usuariosTabla">
            <thead>
              <tr>
                <th>ID</th>
                <th>Nombre</th>
                <th>Dirección</th>
                <th>Email</th>
                <th>Password</th>
                <th>Telefono</th>
                <th>Rol</th>
                <th>Calle</th>
                <th>Fecha de Registro</th>
                <th>Editar</th>
                <th>Eliminar</th>
              </tr>
            </thead>
            <tbody>
              {usuarios.map((usuario) => (
                <tr key={usuario.id}>
                  <td>{usuario.id}</td>
                  <td>
                    {usuario.name?.firstname} {usuario.name?.lastname}
                  </td>
                  <td>{usuario.nombre}</td>
                  <td>{usuario.direccion}</td>
                  <td>{usuario.password}</td>
                  <td>{usuario.telefono}</td>
                  <td>{usuario.rol}</td>
                  <td>{usuario.address?.city}</td>
                  <td>{usuario.address?.street}</td>
                  <td>{usuario.address?.number}</td>
                  <td className="accionesCelda">
                    <button
                      type="button"
                      className="btnEditar"
                      onClick={() => setUsuarioSeleccionado(usuario)}
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
