import React, { createContext, useState, useContext, useEffect } from "react";
import jwt_decode from "jwt-decode";
import { AuthAPI } from "../api/client";

// PUBLIC_INTERFACE
const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

const initial = { user: null, token: null, loading: true };

// PUBLIC_INTERFACE
export function AuthProvider({ children }) {
  const [state, setState] = useState(initial);

  // Load user from local storage/token on startup
  useEffect(() => {
    const token = localStorage.getItem("mtpro_token");
    if (token) {
      try {
        const decoded = jwt_decode(token);
        AuthAPI.getMe()
          .then((user) => setState({ user, token, loading: false }))
          .catch(() => {
            setState({ ...initial, loading: false });
            localStorage.removeItem("mtpro_token");
          });
      } catch {
        setState({ ...initial, loading: false });
      }
    } else {
      setState({ ...initial, loading: false });
    }
  }, []);

  // PUBLIC_INTERFACE
  const login = async (email, password) => {
    const d = await AuthAPI.login(email, password);
    localStorage.setItem("mtpro_token", d.token);
    setState({ user: d.user, token: d.token, loading: false });
  };
  // PUBLIC_INTERFACE
  const register = async (email, password, name) => {
    const d = await AuthAPI.register(email, password, name);
    localStorage.setItem("mtpro_token", d.token);
    setState({ user: d.user, token: d.token, loading: false });
  };
  // PUBLIC_INTERFACE
  const logout = () => {
    localStorage.removeItem("mtpro_token");
    setState({ ...initial, loading: false });
  };

  // PUBLIC_INTERFACE
  const isPremium = !!state.user && (state.user.role === "premium" || state.user.role === "admin");
  // PUBLIC_INTERFACE
  const isAdmin = !!state.user && state.user.role === "admin";

  return (
    <AuthContext.Provider value={{
      user: state.user,
      token: state.token,
      loading: state.loading,
      login,
      register,
      logout,
      isPremium,
      isAdmin,
      setUser: (user) => setState((prev) => ({ ...prev, user })),
    }}>
      {children}
    </AuthContext.Provider>
  );
}
