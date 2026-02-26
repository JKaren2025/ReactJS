import Mapa from './Mapa';
import RutaMapa from './RutaMapa';
import './Sucursales.css';

// user-provided items; we'll maintain existing header text and structure below
const SUCURSALES = [
  {
    // primera tarjeta: ahora ubicada en Huauchinango
    nombre: 'Huauchinango',
    direccion: 'Plaza principal, Huauchinango, Puebla',
    telefono: '+52 782 000 0001',
    imagen: '',
    // coordenadas aproximadas de Huauchinango, Puebla
    latitud: 20.1175,
    longitud: -97.6638,
  },
  {
    nombre: 'Zacatlán',
    direccion: 'Centro histórico, Zacatlán de las Manzanas, Puebla',
    telefono: '+52 782 000 0002',
    imagen: '',
    // coordenadas aproximadas de Zacatlán
    latitud: 19.9996,
    longitud: -97.9716,
  },
  {
    nombre: 'Puebla',
    direccion: 'Zócalo, Puebla de Zaragoza, Puebla',
    telefono: '+52 782 000 0003',
    imagen:
      'https://images.unsplash.com/photo-1559126221-ae05a1d6ded2?auto=format&fit=crop&w=800&q=60',
    // coordenadas aproximadas del centro de Puebla capital
    latitud: 19.0426,
    longitud: -98.2063,
  },
  {
    nombre: 'Querétaro',
    direccion: 'Plaza de Armas, Santiago de Querétaro, Querétaro',
    telefono: '+52 782 000 0004',
    imagen: '',
    // coordenadas aproximadas de Querétaro centro
    latitud: 20.5888,
    longitud: -100.3899,
  },
];

function Sucursales() {
  // keep the original descriptive header from your earlier version
  return (
    <section className="sucursalesSection">
      <header className="sucursalesHeader">
        <p className="sucursalesTag">Presencia internacional</p>
        <h2>Nuestras Sucursales</h2>
        <p>
          Estamos creciendo para llevar creatividad, cursos y productos
          artesanales a mas ciudades.
        </p>
      </header>

      <div className="lista-sucursales">
        {SUCURSALES.map((sucursal) => (
          <TarjetaSucursal key={sucursal.nombre} {...sucursal} />
        ))}
      </div>

      <RutaMapa sucursales={SUCURSALES} />
    </section>
  );
}

function TarjetaSucursal({ nombre, direccion, telefono, imagen, latitud, longitud }) {
  // if an image URL is provided, use it as a background on the article
  const style = imagen
    ? {
        backgroundImage: `url(${imagen})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }
    : {};

  return (
    <article className="sucursal" style={style}>
      <div className="sucursalContent">
        <h3>{nombre}</h3>
        <p className="direccion">{direccion}</p>
        <Mapa lat={latitud} lng={longitud} nombre_sucursal={nombre} />
        <p className="coordenadas">
          Lat: {latitud} | Lng: {longitud}
        </p>
        <p>{telefono}</p>
        <a href="#">Ver mas</a>
      </div>
    </article>
  );
}

export default Sucursales;
