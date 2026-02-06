import React from "react";
import "./ContenedorTarjeta.css";
import logo_manualidades from "./assets/logo_manualidades.png";
import logo_pintura from "./assets/logo_pintura.png";
import logo_artes from "./assets/logo_artes.png";

function ContenedorTarjeta() {
  const cards = [
    { id: 1, title: "Manualidades", text: "Descripción breve de la tarjeta 1", img: logo_manualidades },
    { id: 2, title: "Pintura", text: "Descripción breve de la tarjeta 2", img: logo_pintura },
    { id: 3, title: "Artes", text: "Descripción breve de la tarjeta 3", img: logo_artes },
  ];

  return (
    <div className="contenedorDiv">
      {cards.map((c) => (
        <div key={c.id} className="tarjetaDiv">
          {c.img ? <img src={c.img} alt={c.title} /> : null}
          <h3>{c.title}</h3>
          <p>{c.text}</p>
          <a href="#">Ver más</a>
        </div>
      ))}
    </div>
  );
}

export default ContenedorTarjeta;
