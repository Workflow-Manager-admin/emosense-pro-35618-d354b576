import React, { useState } from "react";
import { useAppState } from "../context/AppStateContext";
import { MoodAPI } from "../api/client";
import { toast } from "react-hot-toast";

const EMOJIS = [
  { emoji: "😡", score: 1 },
  { emoji: "😟", score: 3 },
  { emoji: "😐", score: 5 },
  { emoji: "😊", score: 7 },
  { emoji: "😄", score: 9 },
];

export default function MoodLog({ compact }) {
  const [selected, setSelected] = useState(null);
  const [note, setNote] = useState("");
  const [loading, setLoading] = useState(false);
  const { fetchMoods } = useAppState();

  const handleLog = async () => {
    if (selected == null) return toast.error("Select emoji!");
    setLoading(true);
    try {
      await MoodAPI.create({
        emoji: EMOJIS[selected].emoji,
        score: EMOJIS[selected].score,
        note,
      });
      toast.success("Mood saved!");
      setNote("");
      fetchMoods();
    } catch (e) {
      toast.error(e.message.replace("Mood already logged today", "Only one log per day!"));
    }
    setLoading(false);
  };

  return (
    <div className="w-full flex flex-col gap-2 items-start glass-panel p-5 luxury-card-shadow">
      <div className="flex items-center gap-2">
        <span className="font-semibold text-base premium-gradient-text" style={{ letterSpacing: 0.02 }}>How are you feeling today?</span>
        <div className="flex gap-2">
          {EMOJIS.map((e, idx) => (
            <button
              key={e.emoji}
              onClick={() => setSelected(idx)}
              className={
                "text-2xl p-2 rounded-full shadow bg-white/20 border transition ring-offset-2 " +
                (selected === idx
                  ? "ring-2 ring-yellow-400 brightness-125 shadow-xl scale-105 animate-pulse"
                  : "hover:bg-yellow-50 hover:shadow-md ring-0")
              }
              style={{
                border:
                  selected === idx
                    ? "2px solid #FFD700"
                    : "1.5px solid var(--glass-border)",
                backdropFilter: "blur(4px)",
                transition: "all 130ms cubic-bezier(.5,0,.41,1)",
                fontSize: "2rem",
              }}
              type="button"
              aria-label={e.emoji}
              tabIndex={0}
            >
              {e.emoji}
            </button>
          ))}
        </div>
      </div>
      {!compact && (
        <textarea
          className="w-full mt-2 p-3 rounded-xl glass-panel"
          style={{
            border: "1.5px solid var(--glass-border)",
            background: "rgba(255,255,255,0.10)",
            fontFamily: "var(--upscale-font)",
            color: "var(--text-color)",
          }}
          placeholder="Add a note..."
          value={note}
          onChange={e => setNote(e.target.value)}
          rows={2}
        />
      )}
      <button
        className="btn btn-large mt-2"
        onClick={handleLog}
        disabled={loading}
        style={{
          width: compact ? "auto" : "100%",
          fontWeight: 700,
          boxShadow:
            "0 3px 16px 0 #ffd70066, 0 1.4px 10px 0 #a384f5aa, var(--shadow)",
        }}
      >
        Log Mood
      </button>
    </div>
  );
}
