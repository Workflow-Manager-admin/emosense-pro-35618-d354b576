import React from "react";
import { useAuth } from "../context/AuthContext";
import { Navigate } from "react-router-dom";

// PUBLIC_INTERFACE
// Protect route for login (and optionally premium/admin)
export default function ProtectedRoute({ children, premiumOnly = false, adminOnly = false }) {
  const { user, loading, isPremium, isAdmin } = useAuth();
  if (loading) return <div className="p-8 text-center">Loading...</div>;
  if (!user) return <Navigate to="/login" replace />;

  if (premiumOnly && !isPremium) return <Navigate to="/upgrade" replace />;
  if (adminOnly && !isAdmin) return <Navigate to="/" replace />;
  return children;
}
