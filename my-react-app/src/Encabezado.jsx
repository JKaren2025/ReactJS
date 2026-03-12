import whatsapp from "./assets/logo_Whatsaap.png";
import youtube from "./assets/logo_youtube.png";
import instagram from "./assets/logo_instagram.png";
import tiktok from "./assets/logo_tik-tok.png";
import PropTypes from "prop-types";
import "./Encabezado.css";
import Clima from "./Clima";
import { useAuth } from "./AuthContext";

function Encabezado({ cambiarVista }) {
  return (
    <header className="encabezadoDiv">
      <Logo />
      <Menu cambiarVista={cambiarVista} />
      <Redes />
    </header>
  );
}

function Logo() {
  return (
    <div className="Logo">
      <img
        src="https://t4.ftcdn.net/jpg/03/31/00/65/360_F_331006500_1JH3P15CpMS4zxT0m5UxodxS7xPf274u.jpg"
        alt="Logo principal"
      />
    </div>
  );
}

function Menu({ cambiarVista }) {
  const { isLoggedIn, logout } = useAuth(); //Obtenemos el estado de autenticación y la función de logout del contexto de autenticación
  const handleLogout = () => {
    logout(); //Llamamos a la función de logout para cerrar la sesión del usuario
    cambiarVista("Inicio"); //Mandamos al usuario a la vista de "Inicio" después de cerrar sesión
  };  
  return (
    <nav className="menuDiv" aria-label="Navegacion principal">
      <ul>
        <li onClick={() => cambiarVista("Inicio")}>Inicio</li>
        <li onClick={() => cambiarVista("Acerca de")}>Acerca de</li>
        <li onClick={() => cambiarVista("Productos")}>Productos</li>
        <li onClick={() => cambiarVista("Galeria")}>Galeria</li>
        <li onClick={() => cambiarVista("Sucursales")}>Sucursales</li>
        {isLoggedIn ? ( //Si el usuario está autenticado, muestra las opciones de menú para usuarios autenticados
          <>
          <li onClick={() => cambiarVista("Usuarios")}>Usuarios</li>
          <li onClick={() => cambiarVista("Categorias")}>Categorias</li>
          <li onClick={() => cambiarVista("Carritos")}>Carritos</li>
          <li onClick={handleLogout}>Cerrar sesión</li>
          </>):(
          <li onClick={() => cambiarVista("Login")}>Ingresar Sesión</li>
        )}
      </ul>
    </nav>
  );
}

function Redes() {
  return (
    <div className="RedesDiv">
      <ul>
        <img src={whatsapp} alt="WhatsApp" width="50" />
        <img src={youtube} alt="YouTube" width="50" />
        <img src={instagram} alt="Instagram" width="50" />
        <img src={tiktok} alt="TikTok" width="50" />
      </ul>
      <Clima />
    </div>
  );
}

Menu.propTypes = {
  cambiarVista: PropTypes.func.isRequired,
};

Encabezado.propTypes = {
  cambiarVista: PropTypes.func.isRequired,
};

export default Encabezado;




 /* return (
    <nav className="menuDiv" aria-label="Navegacion principal">
      <ul>
        <li onClick={() => cambiarVista("Inicio")}>Inicio</li>
        <li onClick={() => cambiarVista("Acerca de")}>Acerca de</li>
        <li onClick={() => cambiarVista("Productos")}>Productos</li>
        {isLoggedInm ? ( //Si el usuario está autenticado, muestra las opciones de menú para usuarios autenticados
          <>
            <li onClick={() => cambiarVista("Usuarios")}>Usuarios</li>
            <li onClick={() => cambiarVista("Carritos")}>Carritos</li>
            <li>Cerrar sesión</li>
          </>):
          (
             <li onClick={() => cambiarVista("Login")}>Iniciar Sesión</li>
          )}
        <li onClick={() => cambiarVista("Galeria")}>Galeria</li>
        <li onClick={() => cambiarVista("Sucursales")}>Sucursales</li>
        <li onClick={() => cambiarVista("Contacto")}>Contacto</li>
        <li onClick={() => logout()}>Cerrar sesión</li> 
        </>):(
        <li onClick={() => cambiarVista("Login")}>Ingresar </li>
        )}
      </ul>
    </nav>
  );
}*/
