import { useEffect, useState } from "react";

function Clima() {
  const [clima, setClima] = useState(null);
  const API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY;
  const lat = 20.174859147848064;
  const lng = -98.05183056331461;

  useEffect(() => {
    fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${API_KEY}&units=metric&lang=es`
    )
      .then((res) => res.json())
      .then((data) => {
        setClima(data);
      })
      .catch((error) => console.error("Error fetching weather data:", error));
  }, [API_KEY, lat, lng]);

  return (
    <div className="divClima">
      {clima ? (
        <>
          <p>
            {clima.name} Tem: {clima.main.temp}°C Hum: {clima.main.humidity}%
          </p>
          <p>Descripcion: {clima.weather[0].description}</p>
        </>
      ) : (
        <p>Cargando clima...</p>
      )}
    </div>
  );
}

export default Clima;