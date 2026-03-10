import { useState } from "react";
import ContenedorTarjeta from "./ContenedorTarjeta";
import Encabezado from "./Encabezado";
import PieComponente from "./PieComponente";
import PromosContenido from "./PromosContenido";
import { AuthProvider } from "./AuthContext";


function App() {
     const [vista, setVista]  = useState("Inicio");   

   return(
      <div> 
        <AuthProvider>
         <Encabezado cambiarVista={setVista}/>
         <ContenedorTarjeta vista={vista} />
        </AuthProvider>
        <PromosContenido />
        <PieComponente />
      </div>
  );
}

export default App;
