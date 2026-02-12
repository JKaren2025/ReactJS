import whatsapp from "./assets/logo_Whatsaap.png";
import youtube from "./assets/logo_youtube.png";
import instagram from "./assets/logo_instagram.png";
import tiktok from "./assets/logo_tik-tok.png";
import PropTypes from "prop-types";
import "./Encabezado.css";

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
  return (
    <nav className="menuDiv" aria-label="Navegacion principal">
      <ul>
        <li onClick={() => cambiarVista("Inicio")}>Inicio</li>
        <li onClick={() => cambiarVista("Acerca de")}>Acerca de</li>
        <li onClick={() => cambiarVista("Productos")}>Productos</li>
        <li onClick={() => cambiarVista("Galeria")}>Galeria</li>
        <li onClick={() => cambiarVista("Sucursales")}>Sucursales</li>
        <li onClick={() => cambiarVista("Contacto")}>Contacto</li>
      </ul>
    </nav>
  );
}

function Redes() {
  return (
    <div className="RedesDiv">
      <li>
        <a href="#">
          <img src={whatsapp} alt="WhatsApp" width="50" />
        </a>
      </li>
      <li>
        <a href="#">
          <img src={youtube} alt="YouTube" width="50" />
        </a>
      </li>
      <li>
        <a href="#">
          <img src={instagram} alt="Instagram" width="50" />
        </a>
      </li>
      <li>
        <a href="#">
          <img src={tiktok} alt="TikTok" width="50" />
        </a>
      </li>
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
