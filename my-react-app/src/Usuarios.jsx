import { useState, useEffect } from 'react';
import api from './Services/api';
import './Usuario.css';

function Usuarios() {
  const [usuarios, setUsuarios] = useState([]);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    const obtenerUsuarios = async () => {
      try {
        const response = await api.get('/users');
        setUsuarios(response.data);
      } catch (error) {
        console.error('Error al obtener los usuarios:', error);
      } finally {
        setCargando(false);
      }
    };

    obtenerUsuarios();
  }, []);

  if (cargando) return <p>Cargando usuarios...</p>;

  return (
    <div className="usuariosDiv">
      <h1>Catalogo Usuarios</h1>

      <div className="usuarioFormCard">
        <h2>Nuevo Usuario</h2>
        <form className="usuariosFormulario">
          <input type="text" name="username" placeholder="Username" />
          <input type="email" name="email" placeholder="Email" />
          <input type="password" name="password" placeholder="Password" />
          <button type="button">Agregar usuario</button>
        </form>
      </div>

      <div className="usuariosTablaContenedor">
        <table className="usuariosTabla">
          <thead>
            <tr>
              <th>ID</th>
              <th>Nombre</th>
              <th>Usuario</th>
              <th>Correo</th>
              <th>Telefono</th>
              <th>Ciudad</th>
              <th>Calle</th>
              <th>Numero</th>
              <th>Zipcode</th>
              <th>Lat</th>
              <th>Long</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {usuarios.map((usuario) => (
              <tr key={usuario.id}>
                <td>{usuario.id}</td>
                <td>{`${usuario.name.firstname} ${usuario.name.lastname}`}</td>
                <td>{usuario.username}</td>
                <td>{usuario.email}</td>
                <td>{usuario.phone}</td>
                <td>{usuario.address.city}</td>
                <td>{usuario.address.street}</td>
                <td>{usuario.address.number}</td>
                <td>{usuario.address.zipcode}</td>
                <td>{usuario.address.geolocation.lat}</td>
                <td>{usuario.address.geolocation.long}</td>
                <td className="accionesCelda">
                  <button type="button" className="btnEditar">
                    Editar
                  </button>
                  <button type="button" className="btnEliminar">
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Usuarios;
