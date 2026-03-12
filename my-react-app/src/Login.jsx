import React, { useState } from "react";
import api from "./Services/api";
import "./Login.css";
import { useAuth } from "./AuthContext";

const Login = ({ chVista, onLoginSuccess }) => {
  const { login } = useAuth();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handlesubmit = async (e) => {
    e.preventDefault();
    const credenciales = { username, password };
    try {
      const respuesta = await api.post("/auth/login", credenciales);
      const data = respuesta.data;
      if (data?.token) {
        login(data.token);
        console.log("Token recibido:", data.token);
        alert("Autenticacion autorizada");
        if (typeof onLoginSuccess === "function") {
          onLoginSuccess();
        }
        if (typeof chVista === "function") {
          chVista("Inicio");
        }
      } else {
        alert("Credenciales invalidas");
      }
    } catch (error) {
      console.error("Error en la autenticacion:", error);
      alert("Error en la autenticacion");
    }
  };

  return (
    <div className="loginContainer">
      <div className="loginCard">
        <div className="profileImg" aria-hidden="true">
          <svg viewBox="0 0 48 48" role="img" aria-label="Usuario">
            <circle cx="24" cy="24" r="22" fill="none" strokeWidth="2" />
            <circle cx="24" cy="18" r="7" fill="none" strokeWidth="2" />
            <path
              d="M10 38c3.5-7 24.5-7 28 0"
              fill="none"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
        </div>
        <h2>Iniciar sesion</h2>
        <form className="loginForm" onSubmit={handlesubmit}>
          <label htmlFor="login-usuario">Usuario</label>
          <input
            id="login-usuario"
            type="text"
            placeholder="Ingresa tu usuario"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <label htmlFor="login-password">Contrasena</label>
          <input
            id="login-password"
            type="password"
            placeholder="Ingresa tu contrasena"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="submit">Acceder</button>
        </form>
        <div className="loginOptions">
          <button type="button" className="option">
            Crear cuenta
          </button>
          <button type="button" className="option">
            Cambiar contrasena
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
