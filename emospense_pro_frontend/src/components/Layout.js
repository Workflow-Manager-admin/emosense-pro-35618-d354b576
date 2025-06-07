import React from "react";
import { Link, NavLink } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const navLinks = [
  { to: "/dashboard", label: "Dashboard", icon: "🏠" },
  { to: "/mood", label: "Mood Log", icon: "😊" },
  { to: "/journal", label: "Journal", icon: "📒" },
  { to: "/trends", label: "Trends", icon: "📈" },
  { to: "/recommendations", label: "Recommendations", icon: "💡" },
  { to: "/export", label: "Export", icon: "⬇️" },
  { to: "/settings", label: "Settings", icon: "⚙️" }
];

export default function Layout({ children }) {
  const { user, logout, isPremium } = useAuth();

  return (
    <div className="min-h-screen bg-neutral-100 flex">
      {/* Sidebar */}
      <aside className="bg-white shadow-lg w-64 hidden md:flex flex-col">
        <div className="h-16 flex items-center justify-center border-b">
          <span className="font-bold text-xl text-indigo-700 flex items-center gap-2">
            <span className="text-2xl">🌈</span> MoodTrack Pro
          </span>
        </div>
        <nav className="flex-1 mt-4">
          {navLinks.map(({ to, label, icon }) => (
            <NavLink
              to={to}
              key={to}
              className={({ isActive }) =>
                "flex items-center px-6 py-3 gap-3 hover:bg-indigo-50 " +
                (isActive ? "bg-indigo-100 font-semibold text-indigo-700" : "text-neutral-700")
              }
            >
              <span className="text-lg">{icon}</span>
              {label}
              {label === "Export" && (
                isPremium
                  ? <span className="ml-2 text-xs px-2 py-0.5 bg-yellow-200 text-yellow-700 rounded-full">Premium</span>
                  : null
              )}
            </NavLink>
          ))}
        </nav>
        <div className="px-4 py-3 border-t flex flex-col gap-1">
          <div className="flex items-center gap-2">
            <span className="font-medium">{user?.name || user?.email}</span>
            {isPremium && (
              <span className="text-xs bg-indigo-200 text-indigo-700 rounded px-2 py-0.5 ml-2">Premium</span>
            )}
          </div>
          <button className="text-indigo-600 mt-1 font-medium hover:underline" onClick={logout}>
            Logout
          </button>
        </div>
      </aside>
      {/* Mobile top bar */}
      <header className="fixed top-0 left-0 right-0 md:hidden bg-white border-b flex items-center justify-between px-4 py-2 z-10">
        <span className="font-bold text-lg text-indigo-700 flex items-center gap-2">
          <span>🌈</span> MoodTrack Pro
        </span>
        <Link to="/settings">
          <span className="text-2xl">⚙️</span>
        </Link>
      </header>
      {/* Main content */}
      <main className="flex-1 min-h-screen pt-16 md:pt-0 px-2 md:px-8">
        {children}
      </main>
    </div>
  );
}
