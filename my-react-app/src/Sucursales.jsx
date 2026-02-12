import "./Sucursales.css";

const sucursales = [
  {
    nombre: "Mexico",
    imagenUrl:
      "https://images.unsplash.com/photo-1518105779142-d975f22f1b0a?auto=format&fit=crop&w=1200&q=80",
    lugares: [
      "CDMX - Coyoacan",
      "CDMX - Roma Norte",
      "Guadalajara - Zapopan",
      "Monterrey - San Pedro",
    ],
  },
  {
    nombre: "Puebla",
    imagenUrl:
      "https://images.unsplash.com/photo-1585464231875-d9ef1f5ad396?auto=format&fit=crop&w=1200&q=80",
    lugares: [
      "Puebla Centro",
      "Cholula",
      "Angelopolis",
      "Lomas de Angelopolis",
    ],
  },
  {
    nombre: "Queretaro",
    imagenUrl:
      "https://images.unsplash.com/photo-1536152470836-b943b246224c?auto=format&fit=crop&w=1200&q=80",
    lugares: [
      "Santiago de Queretaro - Centro Historico",
      "Juriquilla",
      "Corregidora - Candiles",
      "El Pueblito",
    ],
  },
  {
    nombre: "Jalisco",
    imagenUrl:
      "https://images.unsplash.com/photo-1612294037637-ec328d0e075e?auto=format&fit=crop&w=1200&q=80",
    lugares: [
      "Guadalajara - Centro",
      "Zapopan - Andares",
      "Tlaquepaque - Centro",
      "Tlajomulco - Santa Anita",
    ],
  },
  {
    nombre: "Nuevo Leon",
    imagenUrl:
      "https://images.unsplash.com/photo-1543783207-ec64e4d95325?auto=format&fit=crop&w=1200&q=80",
    lugares: [
      "Monterrey - Centro",
      "San Pedro Garza Garcia - Del Valle",
      "Guadalupe - Linda Vista",
      "Apodaca - Centro",
    ],
  },
  {
    nombre: "Veracruz",
    imagenUrl:
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80",
    lugares: [
      "Veracruz - Boca del Rio",
      "Xalapa - Centro",
      "Coatzacoalcos - Centro",
      "Cordoba - Centro",
    ],
  },
];

function Sucursales() {
  const coordenadasPrincipal = {
    lat: 20.17568321075411,
    lng: -98.05175223980018,
  };
  const linkPrincipal = `https://www.google.com/maps/search/?api=1&query=${coordenadasPrincipal.lat},${coordenadasPrincipal.lng}`;

  const getMapsLink = (pais, lugar) => {
    const query = encodeURIComponent(`${lugar}, ${pais}`);
    return `https://www.google.com/maps/search/?api=1&query=${query}`;
  };

  return (
    <section className="sucursalesSection">
      <header className="sucursalesHeader">
        <p className="sucursalesTag">Presencia internacional</p>
        <h2>Nuestras Sucursales</h2>
        <p>
          Estamos creciendo para llevar creatividad, cursos y productos
          artesanales a mas ciudades.
        </p>
        <p>
          Punto principal: 20.17568321075411, -98.05175223980018
        </p>
        <a href={linkPrincipal} target="_blank" rel="noreferrer">
          Ver punto principal en mapa
        </a>
      </header>

      <div className="sucursalesGrid">
        {sucursales.map((sucursal) => (
          <article className="sucursalCard" key={sucursal.nombre}>
            <img
              src={sucursal.imagenUrl}
              alt={`Sucursal en ${sucursal.nombre}`}
              className="sucursalImagen"
            />
            <h3>{sucursal.nombre}</h3>
            <ul>
              {sucursal.lugares.map((lugar) => (
                <li key={lugar}>
                  <a
                    href={getMapsLink(sucursal.nombre, lugar)}
                    target="_blank"
                    rel="noreferrer"
                  >
                    {lugar}
                    <span>Ver en mapa</span>
                  </a>
                </li>
              ))}
            </ul>
          </article>
        ))}
      </div>
    </section>
  );
}

export default Sucursales;
