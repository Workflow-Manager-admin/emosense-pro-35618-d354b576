import React from "react";
import { ExportAPI } from "../api/client";
import { useAuth } from "../context/AuthContext";
import Badge from "../components/Badge";

export default function ExportScreen() {
  const { isPremium } = useAuth();

  const downloadCSV = async () => {
    const res = await ExportAPI.csv();
    const blob = await res.blob();
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "moodtrack_export.csv";
    document.body.appendChild(a);
    a.click();
    a.remove();
    setTimeout(() => window.URL.revokeObjectURL(url), 1000);
  };

  return (
    <div className="max-w-xl mx-auto py-12">
      <h2 className="text-2xl font-bold mb-4">Export Your Data</h2>
      {isPremium ? (
        <>
          <div className="mb-4">
            <Badge label="Premium Feature" color="yellow" />
            <div className="mb-2">Export full mood and journal data for backup or analysis:</div>
          </div>
          <button className="btn btn-large bg-indigo-600 text-white" onClick={downloadCSV}>
            Export CSV
          </button>
          <div className="text-sm text-gray-400 mt-4">
            PDF export, calendar sync, and cloud backup coming soon.
          </div>
        </>
      ) : (
        <div className="p-6 bg-yellow-50 border-yellow-200 border rounded text-yellow-900">
          <div className="font-bold mb-2">Premium required to export data.</div>
          <div>
            <a href="/upgrade" className="text-indigo-700 font-medium hover:underline">
              Upgrade now
            </a> to unlock CSV, PDF, sync, and cloud features.
          </div>
        </div>
      )}
    </div>
  );
}
