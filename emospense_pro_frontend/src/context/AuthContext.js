import React, { createContext, useState, useContext, useEffect } from "react";

// PUBLIC_INTERFACE
const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

// Demo default user: mimic the seeded user from backend for "auth-free" demo mode
const DEMO_USER = {
  email: "123@demo.com",
  name: "Demo User",
  role: "premium",
};

const initial = { user: null, token: null, loading: true };

// PUBLIC_INTERFACE
export function AuthProvider({ children }) {
  const [state, setState] = useState(initial);

  // Auto-login as demo user on startup (skip real auth)
  useEffect(() => {
    setTimeout(() => {
      setState({ user: DEMO_USER, token: "demo-token", loading: false });
    }, 100); // simulate async load
  }, []);

  // Dummy "API" for interface compatibility
  // PUBLIC_INTERFACE
  const login = async (email, password) => {
    setState({ user: DEMO_USER, token: "demo-token", loading: false });
  };
  // PUBLIC_INTERFACE
  const register = async (email, password, name) => {
    setState({ user: { ...DEMO_USER, name, email }, token: "demo-token", loading: false });
  };
  // PUBLIC_INTERFACE
  const logout = () => {
    // No-op: cannot actually "logout" in demo mode.
    setState((prev) => ({ ...prev })); // just force rerender
  };

  // PUBLIC_INTERFACE
  const isPremium = true;
  // PUBLIC_INTERFACE
  const isAdmin = false;

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
