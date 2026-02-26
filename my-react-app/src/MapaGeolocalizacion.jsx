
import React, { useState, useEffect } from "react";

// simple component that shows current location using an iframe embed

function MapaGeolocalizacion() {
    const [ubicacion, setUbicacion] = useState(null);

    useEffect(() => {
        if (!navigator.geolocation) return;
        navigator.geolocation.getCurrentPosition(
            (position) => {
                setUbicacion({
                    lat: position.coords.latitude,
                    lng: position.coords.longitude,
                });
            },
            (error) => {
                console.error(error);
                setUbicacion(null);
            },
            { enableHighAccuracy: true }
        );
    }, []);

    if (!ubicacion) {
        return <p className="mapa-estado">Obteniendo ubicación...</p>;
    }

    const src = `https://www.google.com/maps?q=${ubicacion.lat},${ubicacion.lng}&z=15&output=embed`;
    return (
        <div className="mapa-contenedor">
            <iframe
                title="Ubicación actual"
                src={src}
                width="100%"
                height="260"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
            />
        </div>
    );
}

export default MapaGeolocalizacion;
