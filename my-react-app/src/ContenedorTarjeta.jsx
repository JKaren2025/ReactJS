import AcercaDe from "./Acercade";
import PropTypes from 'prop-types';
import "./ContenedorTarjeta.css";
function ContenedorTarjeta({ vista }) {
  const vistas={
    "Inicio": <Inicio />,
    "Acerca de": <AcercaDe />
  }
}
return(
  <div className="contenedorTarjetaDiv">
    {vistas[vista]}
  </div>
);


function Inicio(){
  return (
    <>
      <TarjetaComponent titulo="Java" descripcion = "lenguaje de programacion general, orientado"> </TarjetaComponent>
      <TarjetaComponent titulo="Python" descripcion = "lenguaje de programacion general, orientado"> </TarjetaComponent>
      <TarjetaComponent titulo="JavaScript" descripcion = "lenguaje de programacion general, orientado"> </TarjetaComponent>
      <TarjetaComponent titulo="PHP" descripcion = "lenguaje de programacion general, orientado"> </TarjetaComponent>
    </>
  );
}

ContenedorTarjeta.propTypes = {
  vista: PropTypes.string.isRequired,
};

export default ContenedorTarjeta;
