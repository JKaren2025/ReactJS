import AcercaDe from "./AcercaDe";
import PropTypes from 'prop-types';
import "./ContenedorTarjeta.css";

function TarjetaComponent({ titulo, descripcion, imagenUrl }) {
  return (
    <div className="tarjetaDiv">
      {imagenUrl ? <img src={imagenUrl} alt={titulo} /> : null}
      <h3>{titulo}</h3>
      <p>{descripcion}</p>
      <a href="#">Ver mas</a>
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
  };

  return (
    <div className="contenedorDiv">
      {vistas[vista] ?? <div>Seccion no disponible.</div>}
    </div>
  );
}


function Inicio(){
  return (
    <>
      <TarjetaComponent
        titulo="Java"
        descripcion="Lenguaje de programacion general, orientado"
        imagenUrl="https://media.istockphoto.com/id/537485315/es/vector/vintage-con-flores-y-modernos-c%C3%ADrculo-marco-de-fondo-de-papel-de-artesan%C3%ADas.jpg?s=612x612&w=0&k=20&c=21SP_yadE3dZ6H7Sp8BUumFpXxDhnbTrkPv22UshgsU="
      />
      <TarjetaComponent
        titulo="Python"
        descripcion="Lenguaje de programacion general, orientado"
        imagenUrl= "https://i.etsystatic.com/25242598/r/isla/84db6d/47046957/isla_500x500.47046957_oiby04bo.jpg"
      />
      <TarjetaComponent
        titulo="JavaScript"
        descripcion="Lenguaje de programacion general, orientado"
        imagenUrl="https://m.media-amazon.com/images/I/71Pi8n0sxQL._UF894,1000_QL80_.jpg"
      />
      <TarjetaComponent
        titulo="PHP"
        descripcion="Lenguaje de programacion general, orientado"
        imagenUrl="https://img2.elyerromenu.com/images/arte-regalo/ramo-de-rosas-eternas-a/img.webp"
      />
    </>
  );
}

ContenedorTarjeta.propTypes = {
  vista: PropTypes.string.isRequired,
};

export default ContenedorTarjeta;
