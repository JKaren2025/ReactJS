import React, { useState } from "react";
import api from "./Services/api";
import "./Login.css";
import { useAuth } from "./AuthContext";

const Login = ({chVista}) => {
  const { login } = useAuth(); //Obtenemos la función de login del contexto de autenticación, consumo la funcion login para actualizar el estado de autenticación global después de una autenticación exitosa
  const [username, setUsername] = useState(""); //Estado para almacenar el nombre de usuario ingresado
  const [password, setPassword] = useState(""); //Estado para almacenar la contraseña ingresada

  const handlesubmit = async (e) => {
    e.preventDefault(); //Prevenimos el comportamiento por defecto del formulario
    const credenciales = { username, password }; //Creamos un objeto con las credenciales ingresadas
    try {
      const respuesta = await api.post('/auth/login', credenciales); //Hacemos una solicitud POST al endpoint de autenticación con las credenciales
      if (respuesta.data.token) {
        alert('Autenticación autorizada'); //Si la respuesta contiene un token, mostramos una alerta indicando que la autenticación fue autorizada  
        chVista("Inicio"); //Cambiamos la vista a "Inicio" después de una autenticación exitosa
      }
      const data = respuesta.data; //Obtenemos los datos de la respuesta
      if (data.token) {
        console.log(respuesta.token); //Si la respuesta contiene un token, lo mostramos en la consola
        login(data.token); //Llamamos a la función de login del contexto de autenticación con el token obtenido //Si la respuesta contiene un token, significa que la autenticación fue exito
        alert('Autenticación autorizada'); //Mostramos una alerta indicando que la autenticación fue autorizada
      } else {
        alert('Credenciales invalidas'); //Si la respuesta no contiene un token, mostramos una alerta indicando que las credenciales son inválidas
      }
    } catch (error) {
      console.error('Error en la autenticación:', error);
      alert('Error en la autenticación');
    }
  };

  return (
    <div className="loginContainer">
      <form onSubmit={handlesubmit}>
        <input
          type="text"
          placeholder="Usuario"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Iniciar Sesión</button>
      </form>
    </div>
  );
};

export default Login;
