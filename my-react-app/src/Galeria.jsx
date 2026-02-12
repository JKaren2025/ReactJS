import "./Galeria.css";

const galeriaItems = [
  {
    titulo: "Ramo Primavera",
    tipo: "Flores de papel",
    imagenUrl:
      "https://images.unsplash.com/photo-1520763185298-1b434c919102?auto=format&fit=crop&w=1400&q=80",
  },
  {
    titulo: "Caja Vintage",
    tipo: "Empaque artesanal",
    imagenUrl:
      "https://images.unsplash.com/photo-1513885535751-8b9238bd345a?auto=format&fit=crop&w=1400&q=80",
  },
  {
    titulo: "Centro de Mesa",
    tipo: "Decoracion de eventos",
    imagenUrl:
      "https://images.unsplash.com/photo-1463320726281-696a485928c7?auto=format&fit=crop&w=1400&q=80",
  },
  {
    titulo: "Rosas de Liston",
    tipo: "Tecnica textil",
    imagenUrl:
      "https://images.unsplash.com/photo-1457089328109-e5d9bd499191?auto=format&fit=crop&w=1400&q=80",
  },
  {
    titulo: "Set Creativo",
    tipo: "Materiales reciclables",
    imagenUrl:
      "https://images.unsplash.com/photo-1452860606245-08befc0ff44b?auto=format&fit=crop&w=1400&q=80",
  },
  {
    titulo: "Bouquet Eterno",
    tipo: "Arreglo premium",
    imagenUrl:
      "https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?auto=format&fit=crop&w=1400&q=80",
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
