import React, { useState } from "react";
import api from "./Services/api";
import "./Login.css";
import { useAuth } from "./AuthContext";

const initialRegisterForm = {
  nombre: "",
  direccion: "",
  telefono: "",
  email: "",
  password: "",
  rol: "cliente",
};

const Login = ({ chVista, onLoginSuccess }) => {
  const { login } = useAuth();
  const [modo, setModo] = useState("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [registerForm, setRegisterForm] = useState(initialRegisterForm);
  const [mensaje, setMensaje] = useState("");

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    const credenciales = { email, password };

    try {
      setMensaje("");
      const respuesta = await api.post("/login", credenciales);
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

  const handleRegisterChange = (e) => {
    setRegisterForm({
      ...registerForm,
      [e.target.name]: e.target.value,
    });
  };

  const handleRegisterSubmit = async (e) => {
    e.preventDefault();

    try {
      setMensaje("");
      await api.post("/usuarios", {
        ...registerForm,
        fecha_registro: new Date().toISOString(),
      });

      setMensaje("Cuenta creada correctamente. Ahora inicia sesion.");
      setEmail(registerForm.email);
      setPassword("");
      setRegisterForm(initialRegisterForm);
      setModo("login");
    } catch (error) {
      console.error("Error al crear la cuenta:", error);
      setMensaje("No se pudo crear la cuenta. Revisa los datos.");
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

        <h2>{modo === "login" ? "Iniciar sesion" : "Crear cuenta"}</h2>
        {mensaje ? <p className="loginMessage">{mensaje}</p> : null}

        {modo === "login" ? (
          <form className="loginForm" onSubmit={handleLoginSubmit}>
            <label htmlFor="login-usuario">Correo electronico</label>
            <input
              id="login-usuario"
              type="email"
              placeholder="Ingresa tu correo"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <label htmlFor="login-password">Contrasena</label>
            <input
              id="login-password"
              type="password"
              placeholder="Ingresa tu contrasena"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button type="submit">Acceder</button>
          </form>
        ) : (
          <form className="loginForm" onSubmit={handleRegisterSubmit}>
            <label htmlFor="register-nombre">Nombre</label>
            <input
              id="register-nombre"
              type="text"
              name="nombre"
              placeholder="Ingresa tu nombre"
              value={registerForm.nombre}
              onChange={handleRegisterChange}
              required
            />
            <label htmlFor="register-direccion">Direccion</label>
            <input
              id="register-direccion"
              type="text"
              name="direccion"
              placeholder="Ingresa tu direccion"
              value={registerForm.direccion}
              onChange={handleRegisterChange}
              required
            />
            <label htmlFor="register-telefono">Telefono</label>
            <input
              id="register-telefono"
              type="text"
              name="telefono"
              placeholder="Ingresa tu telefono"
              value={registerForm.telefono}
              onChange={handleRegisterChange}
              required
            />
            <label htmlFor="register-email">Correo electronico</label>
            <input
              id="register-email"
              type="email"
              name="email"
              placeholder="Ingresa tu correo"
              value={registerForm.email}
              onChange={handleRegisterChange}
              required
            />
            <label htmlFor="register-password">Contrasena</label>
            <input
              id="register-password"
              type="password"
              name="password"
              placeholder="Crea tu contrasena"
              value={registerForm.password}
              onChange={handleRegisterChange}
              required
            />
            <label htmlFor="register-rol">Rol</label>
            <select
              id="register-rol"
              name="rol"
              value={registerForm.rol}
              onChange={handleRegisterChange}
              required
            >
              <option value="cliente">cliente</option>
              <option value="admin">admin</option>
            </select>
            <button type="submit">Registrar cuenta</button>
          </form>
        )}

        <div className="loginOptions">
          {modo === "login" ? (
            <>
              <button type="button" className="option" onClick={() => setModo("register")}>
                Crear cuenta
              </button>
              <button type="button" className="option">
                Cambiar contrasena
              </button>
            </>
          ) : (
            <button type="button" className="option" onClick={() => setModo("login")}>
              Volver a iniciar sesion
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Login;
