import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { AppStateProvider } from "./context/AppStateContext";
import Layout from "./components/Layout";
import ProtectedRoute from "./components/ProtectedRoute";
import Dashboard from "./screens/Dashboard";
import Mood from "./screens/Mood";
import Journal from "./screens/Journal";
import Trends from "./screens/Trends";
import Recommendations from "./screens/Recommendations";
import ExportScreen from "./screens/Export";
import SettingsScreen from "./screens/Settings";
import Upgrade from "./screens/Upgrade";
import { Toaster } from "react-hot-toast";
import "./App.css";

// Remove Login and Register screens/routes.
// All users are considered "logged in" for demo mode.

function App() {
  return (
    <AuthProvider>
      <AppStateProvider>
        <Router>
          <Toaster position="top-center" />
          <Routes>
            <Route
              path="/upgrade"
              element={
                <ProtectedRoute>
                  <Upgrade />
                </ProtectedRoute>
              }
            />
            <Route
              path="/*"
              element={
                <ProtectedRoute>
                  <Layout>
                    <Routes>
                      <Route path="/" element={<Navigate to="/dashboard" replace />} />
                      <Route path="/dashboard" element={<Dashboard />} />
                      <Route path="/mood" element={<Mood />} />
                      <Route path="/journal" element={<Journal />} />
                      <Route path="/trends" element={<Trends />} />
                      <Route path="/recommendations" element={<Recommendations />} />
                      <Route path="/settings" element={<SettingsScreen />} />
                      <Route
                        path="/export"
                        element={
                          <ProtectedRoute premiumOnly>
                            <ExportScreen />
                          </ProtectedRoute>
                        }
                      />
                      <Route path="*" element={<div className="p-8">404 Not Found</div>} />
                    </Routes>
                  </Layout>
                </ProtectedRoute>
              }
            />
          </Routes>
        </Router>
      </AppStateProvider>
    </AuthProvider>
  );
}

export default App;