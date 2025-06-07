import React, { useState } from "react";
import { JournalAPI, AIAPI } from "../api/client";
import { useAppState } from "../context/AppStateContext";
import { toast } from "react-hot-toast";

// Analyze with AI helper
async function analyzeContent(content) {
  try {
    const resp = await AIAPI.analyze(content);
    return resp;
  } catch {
    return {};
  }
}

export default function JournalInput() {
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);
  const { fetchJournals } = useAppState();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!content.trim()) return toast.error("Journal can't be empty");
    setLoading(true);
    let ai = {};
    if (content.length > 20) ai = await analyzeContent(content);
    try {
      await JournalAPI.create({ content, ...ai });
      toast.success("Journal saved!");
      setContent("");
      fetchJournals();
    } catch (e) {
      toast.error("Save failed");
    }
    setLoading(false);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-3 max-w-xl glass-panel luxury-card-shadow p-4"
      style={{
        background: "var(--card-glass-heavy)",
        borderRadius: 20,
      }}
    >
      <textarea
        className="w-full p-3 rounded-xl shadow-sm focus:shadow-lg transition glass-panel bg-white/20"
        style={{
          border: "1.5px solid var(--glass-border)",
          background: "rgba(255,255,255,0.13)",
          fontFamily: "var(--upscale-font)",
          color: "var(--text-color)",
        }}
        placeholder="Write your thoughts..."
        rows={5}
        value={content}
        onChange={e => setContent(e.target.value)}
      />
      <button
        className="btn btn-large"
        type="submit"
        disabled={loading}
        style={{
          fontWeight: 700,
          boxShadow:
            "0 3px 16px 0 #ffd70066, 0 1.4px 10px 0 #a384f5aa, var(--shadow)",
        }}
      >
        {loading ? "Saving..." : "Save Entry"}
      </button>
    </form>
  );
}
