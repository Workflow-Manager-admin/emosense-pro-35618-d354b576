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
  { to: "/settings", label: "Settings", icon: "⚙️" },
];

export default function Layout({ children }) {
  const { user, logout, isPremium } = useAuth();

  return (
    <div
      className="min-h-screen flex bg-gradient-to-tr from-[#17173b] via-[#282362] to-[#5d3ecd]"
      style={{
        fontFamily: "var(--upscale-font)",
      }}
    >
      {/* Sidebar */}
      <aside
        className="hidden md:flex flex-col glass-panel luxury-card-shadow w-64"
        style={{
          minHeight: "100vh",
          position: "sticky",
          top: 0,
          background: "rgba(255,255,255,0.10)",
          borderRight: "1.5px solid var(--glass-border)",
          borderRadius: "0 28px 28px 0",
          boxShadow:
            "8px 0 70px 0 #ffd70022, 0 3px 70px #7c8fff29, var(--shadow)",
        }}
      >
        <div className="h-20 flex items-center justify-center border-b-0 pt-5 pb-1">
          <span
            className="font-bold text-2xl premium-gradient-text flex items-center gap-2"
            style={{
              letterSpacing: 0.02,
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            <span className="text-3xl">🌟</span> MoodTrack Pro
          </span>
        </div>
        <nav className="flex-1 mt-4">
          {navLinks.map(({ to, label, icon }) => (
            <NavLink
              to={to}
              key={to}
              className={({ isActive }) =>
                "flex items-center px-7 py-3 gap-3 rounded-l-full font-medium transition-all " +
                (isActive
                  ? "premium-gradient-text bg-white/10 shadow-lg"
                  : "text-white/85 hover:text-yellow-200 hover:pl-9")
              }
              style={{
                fontSize: "1.13rem",
                marginBottom: 1,
              }}
            >
              <span className="text-lg">{icon}</span>
              {label}
              {label === "Export" && isPremium && (
                <span
                  className="ml-2"
                  style={{
                    background: "var(--premium-gold)",
                    color: "#553900",
                    borderRadius: 999,
                    fontWeight: 700,
                    fontSize: 11,
                    padding: "2px 10px",
                    marginLeft: 7,
                    letterSpacing: "0.03em",
                  }}
                >
                  Premium
                </span>
              )}
            </NavLink>
          ))}
        </nav>
        <div className="px-6 py-6 border-t-0 flex flex-col gap-1 mt-auto">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-white">{user?.name || user?.email}</span>
            {isPremium && (
              <span
                className="premium-gradient-text font-bold"
                style={{
                  background: "var(--premium-gold)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  marginLeft: 6,
                  fontSize: 13.5,
                  letterSpacing: "0.02em",
                }}
              >
                Premium
              </span>
            )}
          </div>
          {/* No logout button – always logged in (demo mode) */}
        </div>
      </aside>
      {/* Mobile top bar */}
      <header className="fixed top-0 left-0 right-0 md:hidden glass-panel" style={{
        background: "linear-gradient(87deg,#25204f 89%,#ffd700 150%)",
        borderBottom: "1px solid var(--glass-border)",
        height: "64px",
        boxShadow: "0 4px 24px #ffd70010",
        zIndex: 100,
      }}>
        <div className="flex items-center justify-between px-5 py-3">
          <span className="premium-gradient-text font-bold text-xl flex items-center gap-2" style={{
            letterSpacing: 0.03,
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}>
            <span>🌟</span> MoodTrack Pro
          </span>
          <Link to="/settings">
            <span className="text-2xl">⚙️</span>
          </Link>
        </div>
      </header>
      {/* Main content */}
      <main className="flex-1 min-h-screen pt-16 md:pt-0 px-2 md:px-8" style={{ zIndex: 10 }}>
        {children}
      </main>
    </div>
  );
}
