import "./Productos.css";

const listaProductos = [
  {
    nombre: "Kit Flores Reciclables",
    descripcion:
      "Incluye moldes, alambre y guia para crear flores decorativas con material reutilizable.",
    categoria: "Eco artesanal",
    precio: "$320 MXN",
    imagenUrl:
      "https://i.etsystatic.com/20634225/r/il/f32612/2423745940/il_fullxfull.2423745940_bfe7.jpg",
  },
  {
    nombre: "Caja Regalo Personalizada",
    descripcion:
      "Caja decorada a mano con acabados premium para regalos, recuerdos o eventos especiales.",
    categoria: "Decoracion",
    precio: "$280 MXN",
    imagenUrl:
      "https://images.pexels.com/photos/31884815/pexels-photo-31884815.jpeg",
  },
  {
    nombre: "Bouquet Eterno",
    descripcion:
      "Arreglo floral hecho a mano con tecnicas mixtas, ideal para detalle romantico y decorativo.",
    categoria: "Flores artesanales",
    precio: "$450 MXN",
    imagenUrl:
      "https://images.pexels.com/photos/18289694/pexels-photo-18289694.jpeg",
  },
  {
    nombre: "Set Creativo Infantil",
    descripcion:
      "Material seguro y colorido para estimular creatividad en ninos con proyectos guiados.",
    categoria: "Educativo",
    precio: "$260 MXN",
    imagenUrl:
      "https://img.freepik.com/foto-gratis/primer-mano-mujer-que-sostiene-pincel-paleta-colores-agua-cepillo-pintura-papel-tijera-sobre-fondo-rosa_23-2148137446.jpg?semt=ais_hybrid&w=740&q=80",
  },
  {
    nombre: "Pack Emprende Manualidades",
    descripcion:
      "Seleccion de materiales base para iniciar ventas de productos hechos a mano desde casa.",
    categoria: "Negocio creativo",
    precio: "$590 MXN",
    imagenUrl:
      "https://img.freepik.com/foto-gratis/tarjeta-colorido-libro-recuerdos-diferentes-elementos-decorativos_23-2147899179.jpg?semt=ais_hybrid&w=740&q=80",
  },
  {
    nombre: "Centro de Mesa Rustico",
    descripcion:
      "Pieza artesanal para eventos o hogar, con estilo calido y acabados naturales.",
    categoria: "Hogar y eventos",
    precio: "$380 MXN",
    imagenUrl:
      "https://media.istockphoto.com/id/844209490/es/foto/decoraci%C3%B3n-de-la-recepci%C3%B3n-de-boda-r%C3%BAstica.jpg?s=612x612&w=0&k=20&c=0XHlHQfkbe1PNplZI-c4efJOmUedftJpbxlJW87soWE=",
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
