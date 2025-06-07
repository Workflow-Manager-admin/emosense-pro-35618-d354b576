import React, { useEffect } from "react";
import JournalInput from "../components/JournalInput";
import { useAppState } from "../context/AppStateContext";
import Badge from "../components/Badge";

export default function JournalScreen() {
  const { fetchJournals, journals } = useAppState();

  useEffect(() => {
    fetchJournals();
    // eslint-disable-next-line
  }, []);

  return (
    <div className="max-w-2xl mx-auto py-8">
      <div className="mb-6">
        <JournalInput />
      </div>
      <div className="font-bold mb-2 text-lg">Your Entries</div>
      <div className="flex flex-col gap-3">
        {journals && journals.length > 0 ? (
          journals.map(j => (
            <div key={j._id} className="p-3 rounded bg-white border shadow-sm flex flex-col gap-1">
              <div className="text-sm text-gray-600">
                {new Date(j.date).toLocaleString()}
                {j.aiSentiment && (
                  <Badge label={j.aiSentiment} color="indigo" />
                )}
              </div>
              <div className="whitespace-pre-wrap">{j.content}</div>
            </div>
          ))
        ) : (
          <div className="text-gray-500">No entries yet.</div>
        )}
      </div>
    </div>
  );
}
