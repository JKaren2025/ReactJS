// IMPORTAR IMÁGENES
import miLogo from './assets/logo_huella.png'
import whatsapp from './assets/logo_Whatsaap.png'
import youtube from './assets/logo_youtube.png'
import instagram from './assets/logo_instagram.png'
import tiktok from './assets/logo_tik-tok.png'
import PropTypes from 'prop-types';
import './Encabezado.css';

function Encabezado({ cambiarVista }) {
    return (
        <div className="encabezadoDiv">
            <Logo />
            <Menu cambiarVista={cambiarVista} />
            <Redes />
        </div>
    );
}

function Logo() {
    return (
        <div className="Logo">
            <img src={miLogo} alt="Logo principal" />
        </div>
    )
}

function Menu({ cambiarVista }) {
    return (
        <div className="menuDiv">
            <ul>
                <li onClick={() => cambiarVista("Inicio")}>Inicio</li>
                <li onClick={() => cambiarVista("Acerca de")}>Acerca de</li>
                <li onClick={() => cambiarVista("Productos")}>Productos</li>
                <li onClick={() => cambiarVista("Galeria")}>Galeria</li>
                <li onClick={() => cambiarVista("Sucursales")}>Sucursales</li>
                <li onClick={() => cambiarVista("Contacto")}>Contacto</li>
            </ul>
        </div>
    )
}

function Redes() {
    return (
        <div className="RedesDiv">
            <li><a href='#'><img src={whatsapp} alt="WhatsApp" width='50'/></a></li>
            <li><a href='#'><img src={youtube} alt="YouTube" width='50'/></a></li>
            <li><a href='#'><img src={instagram} alt="Instagram" width='50'/></a></li>
            <li><a href='#'><img src={tiktok} alt="TikTok" width='50'/></a></li>
        </div>
    )
}

Menu.propTypes = {
    cambiarVista: PropTypes.func.isRequired,
}

Encabezado.propTypes = {
    cambiarVista: PropTypes.func.isRequired,
}

export default Encabezado
