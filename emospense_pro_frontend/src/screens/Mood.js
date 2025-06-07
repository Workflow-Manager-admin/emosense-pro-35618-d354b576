import React, { useEffect } from "react";
import { useAppState } from "../context/AppStateContext";
import MoodLog from "../components/MoodLog";

export default function MoodScreen() {
  const { fetchMoods, moods } = useAppState();

  useEffect(() => {
    fetchMoods();
    // eslint-disable-next-line
  }, []);

  return (
    <div className="max-w-2xl mx-auto my-8 flex flex-col gap-4">
      <MoodLog />
      <div className="font-bold text-lg mt-6 mb-2">Mood History</div>
      <div className="flex flex-col gap-2">
        {moods && moods.length > 0 ? (
          moods
            .slice(0, 14)
            .map((m, idx) => (
              <div key={m._id || idx} className="flex gap-2 border-b py-2">
                <div className="text-2xl">{m.emoji}</div>
                <div>
                  <span className="font-medium">{new Date(m.date).toLocaleDateString()}</span>
                  <span className="ml-2 text-gray-500 text-sm">Score: {m.score}</span>
                  {m.note && (
                    <div className="text-gray-700 text-sm mt-1">{m.note}</div>
                  )}
                </div>
              </div>
            ))
        ) : (
          <div className="text-gray-500">No mood logs yet.</div>
        )}
      </div>
    </div>
  );
}
