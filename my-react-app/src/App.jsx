import Encabezado from "./Encabezado";
import ContenedorTarjeta from "./ContenedorTarjeta";
import PromosContenido from "./PromosContenido";
import PieComponente from "./PieComponente";

function App() {
  return (
    <div style={{ background: '#ffffff', color: '#000000' }}>
      <Encabezado />

      <div className="site-container" style={{ maxWidth: '1600px', margin: '0 auto', padding: 24 }}>
        <ContenedorTarjeta />
        <PromosContenido />
        <PieComponente />
      </div>
    </div>
  );
}

export default App;
