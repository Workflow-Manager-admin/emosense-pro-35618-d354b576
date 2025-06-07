import React from "react";
import { useAuth } from "../context/AuthContext";
import { Navigate } from "react-router-dom";

// PUBLIC_INTERFACE
// Always allow user through (simulate always authenticated for demo), still restrict for premium/admin as needed.
export default function ProtectedRoute({ children, premiumOnly = false, adminOnly = false }) {
  const { user, loading, isPremium, isAdmin } = useAuth();
  if (loading) return <div className="p-8 text-center">Loading...</div>;
  // Never redirect for login – always proceed as "logged in".
  if (!user) return children; // or optionally show loading

  if (premiumOnly && !isPremium) return <Navigate to="/upgrade" replace />;
  if (adminOnly && !isAdmin) return <Navigate to="/" replace />;
  return children;
}
