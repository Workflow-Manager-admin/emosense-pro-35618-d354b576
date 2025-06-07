import React from "react";
import { Link } from "react-router-dom";

export default function PremiumFeatureCard() {
  return (
    <div
      className="glass-panel p-7 luxury-card-shadow flex flex-col gap-3 items-start"
      style={{
        borderRadius: 24,
        background: "rgba(255,255,255,0.15)",
        border: "1.5px solid var(--glass-border)",
        boxShadow: "0 6px 32px 0 #ffd70063, var(--shadow)",
        minWidth: 270,
      }}
    >
      <span
        className="premium-gradient-text text-2xl font-bold flex gap-2 items-center"
        style={{
          letterSpacing: 0.03,
        }}
      >
        <span role="img" aria-label="lock" className="text-3xl">
          🔒
        </span>{" "}
        Unlock MoodTrack Pro <span className="hidden sm:inline">Premium</span>
      </span>
      <ul className="text-base ml-4 mb-1" style={{ color: "#5d4c14" }}>
        <li>• Analytics & advanced mood trends</li>
        <li>• Data export (CSV/PDF), calendar/wellness sync</li>
        <li>• AI-powered recommendations & backup</li>
      </ul>
      <Link
        className="btn btn-large mt-2"
        style={{
          background: "var(--premium-gold)",
          color: "#664400",
          fontWeight: "bold",
          fontSize: "1.16rem",
          letterSpacing: "0.04em",
          boxShadow:
            "0 4px 20px 0 #ffd70077, 0 2px 10px 4px #fff3c299, 0 1.2px 8.5px #ffd90066",
        }}
        to="/upgrade"
      >
        Go Premium
      </Link>
    </div>
  );
}
