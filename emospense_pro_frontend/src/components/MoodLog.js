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
    <div className="w-full flex flex-col gap-2 items-start">
      <div className="flex items-center gap-2">
        <span className="font-semibold">How are you feeling today?</span>
        <div className="flex gap-2">
          {EMOJIS.map((e, idx) => (
            <button
              key={e.emoji}
              onClick={() => setSelected(idx)}
              className={
                "text-2xl p-1 rounded-xl transition " +
                (selected === idx ? "bg-indigo-100 ring-2 ring-indigo-500" : "hover:bg-gray-100")
              }
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
          className="w-full border rounded p-2 mt-2 bg-white focus:outline-none"
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
        style={{ width: compact ? "auto" : "100%" }}
      >
        Log Mood
      </button>
    </div>
  );
}
