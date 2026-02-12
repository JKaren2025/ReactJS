import AcercaDe from "./AcercaDe";
import Contacto from "./Contacto";
import Galeria from "./Galeria";
import Productos from "./Productos";
import Sucursales from "./Sucursales";
import PropTypes from 'prop-types';
import "./ContenedorTarjeta.css";

const inicioCards = [
  {
    titulo: "Manualidades Creativas",
    descripcion: "Ideas practicas para decorar, regalar y emprender con estilo artesanal.",
    imagenUrl:
      "https://images.unsplash.com/photo-1452860606245-08befc0ff44b?auto=format&fit=crop&w=1200&q=80",
  },
  {
    titulo: "Flores de Papel",
    descripcion: "Disenos delicados para ramos y centros de mesa hechos completamente a mano.",
    imagenUrl:
      "https://images.unsplash.com/photo-1520763185298-1b434c919102?auto=format&fit=crop&w=1200&q=80",
  },
  {
    titulo: "Flores de Limpiapipas",
    descripcion: "Modelos coloridos y duraderos para recuerdos, detalles y decoraciones.",
    imagenUrl:
      "https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?auto=format&fit=crop&w=1200&q=80",
  },
  {
    titulo: "Rosas de Liston",
    descripcion: "Acabado elegante para arreglos finos, regalos especiales y eventos.",
    imagenUrl:
      "https://images.unsplash.com/photo-1513885535751-8b9238bd345a?auto=format&fit=crop&w=1200&q=80",
  },
];

function TarjetaComponent({ titulo, descripcion, imagenUrl }) {
  return (
    <div className="tarjetaDiv">
      {imagenUrl ? <img src={imagenUrl} alt={titulo} /> : null}
      <h3>{titulo}</h3>
      <p>{descripcion}</p>
      <a href="#">Descubrir</a>
    </div>
  );
}

TarjetaComponent.propTypes = {
  titulo: PropTypes.string.isRequired,
  descripcion: PropTypes.string.isRequired,
  imagenUrl: PropTypes.string,
};

function ContenedorTarjeta({ vista }) {
  const vistas = {
    "Inicio": <Inicio />,
    "Acerca de": <AcercaDe />,
    "Productos": <Productos />,
    "Galeria": <Galeria />,
    "Sucursales": <Sucursales />,
    "Contacto": <Contacto />,
  };

  return (
    <div
      className={`contenedorDiv ${
        vista === "Inicio" ||
        vista === "Productos" ||
        vista === "Acerca de" ||
        vista === "Galeria" ||
        vista === "Sucursales" ||
        vista === "Contacto"
          ? "contenedorProductos"
          : ""
      }`}
    >
      {vistas[vista] ?? <div>Seccion no disponible.</div>}
    </div>
  );
}


function Inicio(){
  return (
    <section className="inicioSection">
      <header className="inicioHeader">
        <p className="inicioTag">Inspira tu creatividad</p>
        <h2>Tecnicas artesanales que enamoran</h2>
        <p>
          Descubre proyectos hechos a mano para decorar, regalar y transformar
          tu talento en nuevas oportunidades.
        </p>
      </header>
      <div className="inicioGrid">
        {inicioCards.map((card) => (
          <TarjetaComponent
            key={card.titulo}
            titulo={card.titulo}
            descripcion={card.descripcion}
            imagenUrl={card.imagenUrl}
          />
        ))}
      </div>
    </section>
  );
}

ContenedorTarjeta.propTypes = {
  vista: PropTypes.string.isRequired,
};

export default ContenedorTarjeta;
