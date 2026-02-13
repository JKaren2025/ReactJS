import "./Galeria.css";

const galeriaItems = [
  {
    titulo: "Ramo Primavera",
    tipo: "Flores de papel",
    imagenUrl:
      "https://images.pexels.com/photos/15868193/pexels-photo-15868193.jpeg",
  },
  {
    titulo: "Caja Vintage",
    tipo: "Empaque artesanal",
    imagenUrl:
      "https://images.pexels.com/photos/20065927/pexels-photo-20065927.jpeg",
  },
  {
    titulo: "Centro de Mesa",
    tipo: "Decoracion de eventos",
    imagenUrl:
      "https://images.pexels.com/photos/1676122/pexels-photo-1676122.jpeg",
  },
  {
    titulo: "Rosas de Liston",
    tipo: "Tecnica textil",
    imagenUrl:
      "https://images.pexels.com/photos/19376097/pexels-photo-19376097.jpeg",
  },
  {
    titulo: "Set Creativo",
    tipo: "Materiales reciclables",
    imagenUrl:
      "https://images.pexels.com/photos/32350702/pexels-photo-32350702.jpeg",
  },
  {
    titulo: "Bouquet Eterno",
    tipo: "Arreglo premium",
    imagenUrl:
      "https://images.pexels.com/photos/29400307/pexels-photo-29400307.jpeg",
  },
];

function Galeria() {
  return (
    <section className="galeriaSection">
      <header className="galeriaHeader">
        <p className="galeriaTag">Nuestros trabajos</p>
        <h2>Galeria de Inspiracion</h2>
        <p>
          Explora creaciones reales en flores artesanales, decoracion y proyectos
          hechos con creatividad y detalle.
        </p>
      </header>

      <div className="galeriaGrid">
        {galeriaItems.map((item) => (
          <article className="galeriaCard" key={item.titulo}>
            <img src={item.imagenUrl} alt={item.titulo} />
            <div className="galeriaOverlay">
              <p>{item.tipo}</p>
              <h3>{item.titulo}</h3>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

export default Galeria;
