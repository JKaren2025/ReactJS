import './PromosContenido.css';
import promoImg from './assets/logo_promo.png';

function PromosContenido() {
  const style = {
    backgroundImage: `linear-gradient(rgba(3,18,26,0.45), rgba(3,18,26,0.25)), url(${promoImg})`,
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    backgroundPosition: 'center'
  };

  return (
    <div className="promosContenido" style={style}>
      <h2>Promociones</h2>
      <p>Contenido de promociones aquí</p>
    </div>
  );
}

export default PromosContenido;
