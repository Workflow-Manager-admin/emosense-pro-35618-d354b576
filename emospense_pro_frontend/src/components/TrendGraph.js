import React from "react";

// moodData: array of { date, score }
export default function TrendGraph({ moodData }) {
  if (!moodData || moodData.length === 0)
    return (
      <div className="glass-panel p-4 text-center opacity-80">No data</div>
    );
  // Normalize scores to 0-10, dates equally spaced
  const scores = moodData.map((m) => Math.max(0, Math.min(10, m.score || 0)));
  const W = 400,
    H = 120,
    P = 24;
  const step = (W - 2 * P) / Math.max(1, scores.length - 1);
  const points = scores
    .map(
      (s, i) =>
        `${P + i * step},${H - P - (s / 10) * (H - 2 * P)}`
    )
    .join(" ");
  return (
    <svg
      width={W}
      height={H}
      className="glass-panel luxury-card-shadow"
      style={{ borderRadius: 18, background: "rgba(255,255,255,0.23)" }}
    >
      <defs>
        <linearGradient id="goldStroke" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#FFD700" />
          <stop offset="70%" stopColor="#FFB623" />
          <stop offset="100%" stopColor="#F2E477" />
        </linearGradient>
      </defs>
      <polyline
        points={points}
        fill="none"
        stroke="url(#goldStroke)"
        strokeWidth={3.5}
        filter="url(#shadow1)"
      />
      {scores.map((s, i) => (
        <circle
          key={i}
          cx={P + i * step}
          cy={H - P - (s / 10) * (H - 2 * P)}
          r={5}
          fill="url(#goldStroke)"
          stroke="#fffbe6"
          strokeWidth={1}
          filter="drop-shadow(0 4px 12px gold)"
        />
      ))}
      {/* Y-axis labels */}
      <text x={2} y={P + 4} fontSize="11" fill="#FFD700" fontWeight={600}>
        10
      </text>
      <text x={2} y={H - P} fontSize="11" fill="#FFD700" fontWeight={600}>
        0
      </text>
    </svg>
  );
}
