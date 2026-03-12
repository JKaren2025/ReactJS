import { useState } from "react";
import ContenedorTarjeta from "./ContenedorTarjeta";
import Encabezado from "./Encabezado";
import PieComponente from "./PieComponente";
import PromosContenido from "./PromosContenido";
import { AuthProvider } from "./AuthContext";


function App() {
     const [vista, setVista]  = useState("Inicio");   
     const handleLoginSuccess = () => {
      setVista("Inicio");
    };

   return(
      <div> 
        <AuthProvider>
         <Encabezado cambiarVista={setVista}/>
         <ContenedorTarjeta vista={vista} onLoginSuccess={handleLoginSuccess} chVista={setVista} />
        </AuthProvider>
        {vista === "Categorias" ? null : <PromosContenido />}
        <PieComponente />
      </div>
  );
}

export default App;
