import { useEffect, useState } from "react";
import { GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api";

const containerStyle = {
  width: "100%",
  height: "350px",
};

function Mapa({ lat, lng, nombre_sucursal }) {
  const center = { lat, lng };
  const [ubicacionActual, setUbicacionActual] = useState(null);

  const { isLoaded, loadError } = useJsApiLoader({
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY || "",
  });

  useEffect(() => {
    if (!navigator.geolocation) return undefined;

    const watchId = navigator.geolocation.watchPosition(
      (position) => {
        setUbicacionActual({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
      },
      () => {
        setUbicacionActual(null);
      },
      {
        enableHighAccuracy: true,
        maximumAge: 0,
      }
    );

    return () => navigator.geolocation.clearWatch(watchId);
  }, []);

  if (loadError) return <div>Error al cargar el mapa</div>;
  if (!isLoaded) return <div>Cargando mapa...</div>;

  return (
    <div className="mapaInicio">
      <h2>{nombre_sucursal}</h2>
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={ubicacionActual || center}
        zoom={16}
      >
        <Marker position={center} title="Punto promocional" />
        {ubicacionActual && (
          <Marker position={ubicacionActual} title="Tu ubicacion actual" />
        )}
      </GoogleMap>
    </div>
  );
}

export default Mapa;
