import React from "react";

// PUBLIC_INTERFACE
export default function Badge({ label, color = "indigo" }) {
  let bg = {
    indigo: "bg-indigo-100 text-indigo-800",
    yellow: "bg-yellow-100 text-yellow-800",
    green: "bg-green-100 text-green-800",
    gray: "bg-gray-200 text-gray-600"
  }[color];
  return (
    <span className={`inline-block rounded px-2 py-0.5 text-xs font-semibold mr-1 ${bg}`}>
      {label}
    </span>
  );
}
