import { useState, useEffect } from 'react';
import api from './Services/api';
import './Productos.css'

function Productos() {
  const [productos, setProductos] = useState([]);
  const [cargando, setCargando] = useState(true);
  useEffect(() => {
    const obtenerProductos = async () => {
      try {
        const response = await api.get('/products');
        setProductos(response.data); 
      }catch (error) {
        console.error('Error al obtener los productos:', error);
      }finally {
        setCargando (false);
      }
    };
    obtenerProductos();
  }, []);

  if (cargando) return <p>Cargando productos...</p>;
  return (
    <div className="productoDiv">
      <h1>Catalgo Productos</h1>
      {productos.map((producto) => (
        //*Card por producto van aquí
        <div key={producto.id}>
          <p>{producto.title}</p>
          <p>{producto.price}</p>
          <img src={producto.image}/>
        </div>
        //*Card terminana aqui
      ))}
    </div>
  );
}
export default Productos;



