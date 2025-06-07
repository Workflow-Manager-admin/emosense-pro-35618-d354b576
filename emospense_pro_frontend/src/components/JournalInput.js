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
    <form onSubmit={handleSubmit} className="flex flex-col gap-2 max-w-xl">
      <textarea
        className="w-full border rounded p-2 bg-white"
        placeholder="Write your thoughts..."
        rows={5}
        value={content}
        onChange={e => setContent(e.target.value)}
      />
      <button className="btn btn-large" type="submit" disabled={loading}>
        {loading ? "Saving..." : "Save Entry"}
      </button>
    </form>
  );
}
