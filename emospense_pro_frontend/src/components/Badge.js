import React from "react";

// PUBLIC_INTERFACE
export default function Badge({ label, color = "indigo" }) {
  // Glass/gold luxury badge styles
  let luxClass =
    "inline-block rounded-full px-3 py-1 text-xs font-semibold mr-1 glass-panel luxury-card-shadow" +
    (color === "yellow"
      ? " premium-gradient-text border-0"
      : color === "green"
      ? " bg-gradient-to-r from-green-100 via-lime-50 to-yellow-50 text-green-800"
      : color === "gray"
      ? " bg-gradient-to-r from-gray-200 via-white to-slate-100 text-gray-900"
      : " premium-gradient-text border-0");

  return (
    <span
      className={luxClass}
      style={
        color === "yellow" || color === "indigo"
          ? {
              background: "var(--premium-gold)",
              color: "#664400",
              boxShadow:
                "0 2px 13px 0 #ffd70066, 0 0 1.5px 0 #fbe488, var(--shadow)",
            }
          : undefined
      }
    >
      {label}
    </span>
  );
}
