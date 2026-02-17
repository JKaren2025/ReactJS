import { useEffect, useState } from "react";

function Clima() {
    const [clima, setClima] = useState(null);
    const API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY;
    console.log(API_KEY) // Verificar que la clave se está leyendo correctamente https://api.openweathermap.org/data/2.5/weather?lat=20.18027079998248&lon=98.04977913621518&appid=7b09696311242424a972e2fd5fdf4749&units=metric&lang=es
    const lat = 20.174859147848064
    const lng = -98.05183056331461

    useEffect(() => {
        fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${API_KEY}&units=metric&lang=es`)
            .then((res) => res.json())
            .then((data) => {
                console.log(data);
                setClima(data);
            })
            .catch((error) => console.error("Error fetching weather data:", error));
    }, [])

    return (
        <div className="divClima">
            {
                clima ? (
                    <>
                        <p>{clima.name} Tem: {clima.main.temp}°C Hum: {clima.main.humidity}%</p>
                        <p>Descripcion: {clima.weather[0].description}</p>
                    </>
            ) : (
            <p>Cargando clima...</p>
            )
        }
        </div>

    )

}

export default Clima
