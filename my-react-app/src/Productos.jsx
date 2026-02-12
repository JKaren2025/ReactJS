import "./Productos.css";

const listaProductos = [
  {
    nombre: "Kit Flores Reciclables",
    descripcion:
      "Incluye moldes, alambre y guia para crear flores decorativas con material reutilizable.",
    categoria: "Eco artesanal",
    precio: "$320 MXN",
    imagenUrl:
      "https://images.unsplash.com/photo-1452860606245-08befc0ff44b?auto=format&fit=crop&w=1200&q=80",
  },
  {
    nombre: "Caja Regalo Personalizada",
    descripcion:
      "Caja decorada a mano con acabados premium para regalos, recuerdos o eventos especiales.",
    categoria: "Decoracion",
    precio: "$280 MXN",
    imagenUrl:
      "https://images.unsplash.com/photo-1513885535751-8b9238bd345a?auto=format&fit=crop&w=1200&q=80",
  },
  {
    nombre: "Bouquet Eterno",
    descripcion:
      "Arreglo floral hecho a mano con tecnicas mixtas, ideal para detalle romantico y decorativo.",
    categoria: "Flores artesanales",
    precio: "$450 MXN",
    imagenUrl:
      "https://images.unsplash.com/photo-1520763185298-1b434c919102?auto=format&fit=crop&w=1200&q=80",
  },
  {
    nombre: "Set Creativo Infantil",
    descripcion:
      "Material seguro y colorido para estimular creatividad en ninos con proyectos guiados.",
    categoria: "Educativo",
    precio: "$260 MXN",
    imagenUrl:
      "https://images.unsplash.com/photo-1513360371669-4adf3dd7dff8?auto=format&fit=crop&w=1200&q=80",
  },
  {
    nombre: "Pack Emprende Manualidades",
    descripcion:
      "Seleccion de materiales base para iniciar ventas de productos hechos a mano desde casa.",
    categoria: "Negocio creativo",
    precio: "$590 MXN",
    imagenUrl:
      "https://images.unsplash.com/photo-1452860606245-08befc0ff44b?auto=format&fit=crop&w=1200&q=80",
  },
  {
    nombre: "Centro de Mesa Rustico",
    descripcion:
      "Pieza artesanal para eventos o hogar, con estilo calido y acabados naturales.",
    categoria: "Hogar y eventos",
    precio: "$380 MXN",
    imagenUrl:
      "https://images.unsplash.com/photo-1616047006789-b7af6377ff43?auto=format&fit=crop&w=1200&q=80",
  },
];

function Productos() {
  return (
    <section className="productosSection">
      <header className="productosHeader">
        <p className="productosTag">Coleccion artesanal</p>
        <h2>Nuestros Productos</h2>
        <p>
          Cada pieza esta hecha con detalle, creatividad y materiales seleccionados.
          Explora opciones para decorar, regalar o emprender.
        </p>
      </header>

      <div className="productosGrid">
        {listaProductos.map((producto) => (
          <article className="productoCard" key={producto.nombre}>
            <div className="productoGlow" />
            <img
              src={producto.imagenUrl}
              alt={producto.nombre}
              className="productoImagen"
            />
            <p className="productoCategoria">{producto.categoria}</p>
            <h3>{producto.nombre}</h3>
            <p className="productoDescripcion">{producto.descripcion}</p>
            <div className="productoFooter">
              <span>{producto.precio}</span>
              <button type="button">Ver detalle</button>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

export default Productos;
