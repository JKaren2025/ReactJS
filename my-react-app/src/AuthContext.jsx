import { createContext, useContext, useState } from "react";

const AuthContext = createContext();

const parseToken = (token) => {
  if (!token) {
    return null;
  }

  try {
    const payload = token.split(".")[1];

    if (!payload) {
      return null;
    }

    const normalized = payload.replace(/-/g, "+").replace(/_/g, "/");
    const padded = normalized.padEnd(
      normalized.length + ((4 - (normalized.length % 4)) % 4),
      "="
    );

    return JSON.parse(window.atob(padded));
  } catch (error) {
    return null;
  }
};

const getStoredUser = () => {
  const storedUser = localStorage.getItem("auth_user");

  if (storedUser) {
    try {
      return JSON.parse(storedUser);
    } catch (error) {
      localStorage.removeItem("auth_user");
    }
  }

  return parseToken(localStorage.getItem("token"));
};

export const AuthProvider = ({ children }) => {
  const [authState, setAuthState] = useState(() => ({
    token: localStorage.getItem("token"),
    user: getStoredUser(),
  }));

  const login = (token, userData) => {
    const user = userData || parseToken(token);

    localStorage.setItem("token", token);

    if (user) {
      localStorage.setItem("auth_user", JSON.stringify(user));
    } else {
      localStorage.removeItem("auth_user");
    }

    setAuthState({ token, user });
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("auth_user");
    setAuthState({ token: null, user: null });
  };

  const isLoggedIn = Boolean(authState.token && authState.user);

  return (
    <AuthContext.Provider
      value={{
        token: authState.token,
        user: authState.user,
        isLoggedIn,
        isAdmin: authState.user?.rol === "admin",
        isCliente: authState.user?.rol === "cliente",
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth debe ser usado dentro de un AuthProvider");
  }

  return context;
};
