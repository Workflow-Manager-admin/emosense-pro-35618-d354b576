import React from "react";
import { Link } from "react-router-dom";

export default function PremiumFeatureCard() {
  return (
    <div className="border border-indigo-200 rounded-lg p-6 bg-indigo-50 shadow flex flex-col gap-2 items-start">
      <span className="text-xl font-semibold text-indigo-800 flex gap-2 items-center">
        <span className="text-3xl">🔒</span> Unlock MoodTrack Pro Premium
      </span>
      <ul className="text-indigo-700 ml-4 mb-1 text-base">
        <li>• Analytics and advanced mood trends</li>
        <li>• Data export (CSV/PDF), calendar/wellness sync</li>
        <li>• AI-powered recommendations & backup</li>
      </ul>
      <Link
        className="btn btn-large bg-indigo-600 text-white mt-2 hover:bg-indigo-800"
        to="/upgrade"
      >
        Go Premium
      </Link>
    </div>
  );
}
