import React, { useState } from "react";
import PropTypes from "prop-types";
import api from "./Services/api";
import "./Login.css";

const logoUrl =
  "https://t4.ftcdn.net/jpg/03/31/00/65/360_F_331006500_1JH3P15CpMS4zxT0m5UxodxS7xPf274u.jpg";

function Login({ onLoginSuccess }) {
  const [usuario, setUsuario] = useState("");
  const [contrasena, setContrasena] = useState("");
  const [cargando, setCargando] = useState(false);

  const manejarLogin = async (event) => {
    event.preventDefault();

    if (!usuario.trim() || !contrasena.trim()) {
      alert("Debes escribir usuario y contrasena.");
      return;
    }

    setCargando(true);

    try {
      const respuesta = await api.get("https://fakestoreapi.com/users");
      const usuarios = Array.isArray(respuesta.data) ? respuesta.data : [];

      const existeUsuario = usuarios.find(
        (item) => item.username === usuario.trim() && item.password === contrasena
      );

      if (existeUsuario) {
        const authRespuesta = await api.post("https://fakestoreapi.com/auth/login", {
          username: usuario.trim(),
          password: contrasena,
        });
        const token = authRespuesta?.data?.token;
        if (token) {
          console.log("token:", token);
        }
        alert("Credenciales autorizadas.");
        setTimeout(() => {
          onLoginSuccess();
        }, 200);
        return;
      }

      alert("Credenciales invalidas.");
    } catch (error) {
      console.error("Error al validar credenciales:", error);
      alert("Credenciales invalidas o error de servidor.");
    } finally {
      setCargando(false);
    }
  };

  return (
    <div className="loginContainer">
      <div className="loginCard">
        <h2>Iniciar sesion</h2>
        <img className="profileImg" src={logoUrl} alt="Perfil" />

        <form className="loginForm" onSubmit={manejarLogin}>
          <label htmlFor="usuario">Usuario</label>
          <input
            id="usuario"
            name="usuario"
            type="text"
            value={usuario}
            onChange={(event) => setUsuario(event.target.value)}
          />

          <label htmlFor="contrasena">Contrasena</label>
          <input
            id="contrasena"
            name="contrasena"
            type="password"
            value={contrasena}
            onChange={(event) => setContrasena(event.target.value)}
          />

          <button type="submit" disabled={cargando}>
            {cargando ? "Validando..." : "Acceder"}
          </button>
        </form>

        <div className="loginOptions">
          <div className="option">Crear cuenta</div>
          <div className="option">Recuperar cuenta</div>
        </div>
      </div>
    </div>
  );
}

Login.propTypes = {
  onLoginSuccess: PropTypes.func.isRequired,
};

export default Login;
