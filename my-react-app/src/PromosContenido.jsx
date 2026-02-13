import Mapa from "./Mapa";
import "./PromosContenido.css";

function PromosContenido() {
  const coordenadas = {
    lat: 20.17568321075411,
    lng: -98.05175223980018,
  };
  const mapaLink = `https://www.google.com/maps/search/?api=1&query=${coordenadas.lat},${coordenadas.lng}`;

  const promoImg =
    "https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=1400&q=80";

  const style = {
    backgroundImage: `linear-gradient(rgba(58,35,22,0.54), rgba(58,35,22,0.32)), url(${promoImg})`,
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    backgroundPosition: "center",
  };

  return (
    <div className="promosContenido" style={style}>
      <p className="promoTag">Edicion especial</p>
      <h2>Promocion en temporada creativa</h2>
      <p>
        Aprovecha paquetes especiales en kits de manualidades, flores artesanales
        y materiales para tus proximos proyectos.
      </p>
      <Mapa
        lat={coordenadas.lat}
        lng={coordenadas.lng}
        nombre_sucursal="Punto promocional principal"
      />
      <a href={mapaLink} target="_blank" rel="noreferrer">
        Ver ubicacion de la promocion
      </a>
      <a href="#">Ver ofertas</a>
    </div>
  );
}

export default PromosContenido;
