import React from "react";
import Badge from "../components/Badge";

// Would pull personalized recommendations from API in production
const DEMO = [
  { activity: "Go for a mindful walk", icon: "🚶", mood: "anxious" },
  { activity: "Try a deep breathing exercise", icon: "🧘", mood: "sad" },
  { activity: "Listen to uplifting music", icon: "🎵", mood: "tired" },
  { activity: "Write a gratitude list", icon: "📝", mood: "neutral" },
];

export default function Recommendations() {
  return (
    <div className="max-w-xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-2">Today's AI Recommendations</h2>
      <div className="flex flex-col gap-2">
        {DEMO.map((rec, idx) => (
          <div
            className="bg-white rounded border p-3 flex items-center gap-3"
            key={idx}
          >
            <span className="text-2xl">{rec.icon}</span>
            <span>{rec.activity}</span>
            <Badge label={rec.mood} color="gray" />
          </div>
        ))}
      </div>
      <div className="text-sm text-gray-400 mt-4">
        Personalized AI tips and activities based on your trends!
      </div>
    </div>
  );
}
