import React from "react";

// moodData: array of { date, score }
export default function TrendGraph({ moodData }) {
  if (!moodData || moodData.length === 0) return <div>No data</div>;
  // Normalize scores to 0-10, dates equally spaced
  const scores = moodData.map(m => Math.max(0, Math.min(10, m.score || 0)));
  const W = 400, H = 120, P = 24;
  const step = (W - 2 * P) / Math.max(1, scores.length - 1);
  const points = scores.map(
    (s, i) => `${P + i * step},${H - P - (s / 10) * (H - 2 * P)}`
  ).join(" ");
  return (
    <svg width={W} height={H} className="bg-white rounded shadow">
      <polyline
        points={points}
        fill="none"
        stroke="#6366F1"
        strokeWidth={3}
      />
      {scores.map((s, i) => (
        <circle
          key={i}
          cx={P + i * step}
          cy={H - P - (s / 10) * (H - 2 * P)}
          r={4}
          fill="#818CF8"
        />
      ))}
      {/* Y-axis labels */}
      <text x={2} y={P + 4} fontSize="10" fill="#6366F1">10</text>
      <text x={2} y={H - P} fontSize="10" fill="#6366F1">0</text>
    </svg>
  );
}
