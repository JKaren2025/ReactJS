import React from "react";
import "./Login.css";

// same logo URL as header uses
const logoUrl =
  "https://t4.ftcdn.net/jpg/03/31/00/65/360_F_331006500_1JH3P15CpMS4zxT0m5UxodxS7xPf274u.jpg";

function Login() {
  return (
    <div className="loginContainer">
      <div className="loginCard">
        <h2>Iniciar sesión</h2>
        <img className="profileImg" src={logoUrl} alt="Perfil" />
        <form className="loginForm">
          <label htmlFor="usuario">Usuario</label>
          <input id="usuario" name="usuario" type="text" />

          <label htmlFor="contrasena">Contraseña</label>
          <input id="contrasena" name="contrasena" type="password" />

          <button type="submit">Acceder</button>
        </form>

        <div className="loginOptions">
          <div className="option">Crear cuenta</div>
          <div className="option">Recuperar cuenta</div>
        </div>
      </div>
    </div>
  );
}

export default Login;
