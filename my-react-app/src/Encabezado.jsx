// IMPORTAR IMÁGENES
import { useState } from 'react';
import miLogo from './assets/logo_huella.png'
import whatsapp from './assets/logo_Whatsaap.png'
import youtube from './assets/logo_youtube.png'
import instagram from './assets/logo_instagram.png'
import tiktok from './assets/logo_tik-tok.png'
import './Encabezado.css';

function Encabezado() {
    return (
        <div className="Encabezado">
            <Logo />
            <Menu />
            <Redes />
            <h2>Bienvenido a mi sitio</h2>
        </div>
    )
}

function Logo() {
    return (
        <div className="Logo">
            <img src={miLogo} alt="Logo principal" />
        </div>
    )
}

function Menu() {
    const [active, setActive] = useState(0);
    const items = ['Inicio', 'Acerca de', 'Productos', 'Contacto', 'Sucursales'];
    return (
        <nav className="menu" aria-label="Main navigation">
            <ul>
                {items.map((label, i) => (
                    <li key={label}>
                        <a
                            href="#"
                            className={active === i ? 'active' : ''}
                            onClick={(e) => { e.preventDefault(); setActive(i); }}
                            onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); setActive(i); } }}
                            aria-current={active === i ? 'page' : undefined}
                        >
                            {label}
                        </a>
                    </li>
                ))}
            </ul>
        </nav>
    )
}

function Redes() {
    return (
        <div className="Redes">
            <img src={whatsapp} alt="WhatsApp" />
            <img src={youtube} alt="YouTube" />
            <img src={instagram} alt="Instagram" />
            <img src={tiktok} alt="TikTok" />
        </div>
    )
}

export default Encabezado
