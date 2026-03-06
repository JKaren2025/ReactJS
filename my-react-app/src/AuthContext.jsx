import { createContext, useState, useContext } from "react";
const AuthContext = createContext(); 
export const AuthProvider = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem('token'));

    const login = (token) => {
        localStorage.setItem('token', token);//Guardamos el token en el localStorage para mantener la sesión
        setIsLoggedIn(true);
    };
    const logout = () => {
        localStorage.removeItem('token');//eliminamos el token del localStorage para cerrar la sesión, limpiamos al asalir, el estado de autenticación 
        setIsLoggedIn(false);
    };
    return (
        <AuthContext.Provider value={{ isLoggedIn, login, logout }}>
            {children}
        </AuthContext.Provider>
    );

};
export const useAuth = () =>{
    const context = useContext(AuthContext);
    if (!context) {//EN CASO DE QUE NO SEA CORRECTO MANDARA EL SIGUIENTE MENSAJE
        throw new Error("useAuth debe ser usado dentro de un AuthProvider");//ESTE MENSAJE SE MOSTRARA SI SE INTENTA USAR EL HOOK 
        // useAuth FUERA DEL CONTEXTO DE AuthProvider, ASEGURANDO QUE LOS COMPONENTES QUE LO USEN ESTEN ENVUELTOS EN EL PROVEEDOR DE AUTENTICACION
    }
    return context;
};//librerias y varibles a usar en el contexto de autenticacion, como el estado del usuario, funciones de login/logout, etc.
