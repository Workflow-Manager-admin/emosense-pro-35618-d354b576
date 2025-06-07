import React, { useEffect } from "react";
import { useAppState } from "../context/AppStateContext";
import TrendGraph from "../components/TrendGraph";
import { useAuth } from "../context/AuthContext";
import Badge from "../components/Badge";

export default function TrendsScreen() {
  const { fetchMoods, moods, analytics, fetchAnalytics } = useAppState();
  const { isPremium } = useAuth();

  useEffect(() => {
    fetchMoods();
    if (isPremium) fetchAnalytics();
    // eslint-disable-next-line
  }, [isPremium]);

  return (
    <div className="max-w-2xl mx-auto py-8">
      <h2 className="text-2xl font-bold mb-2">Mood Trends</h2>
      <div className="bg-white px-2 py-3 rounded shadow">
        <TrendGraph moodData={moods.slice(-14).reverse()} />
      </div>
      {isPremium && analytics && (
        <div className="mt-6">
          <Badge label="Premium Analytics" color="yellow" />
          <div className="bg-yellow-50 border-yellow-200 border rounded p-3 text-yellow-900 mt-2">
            <div>Number of logs: <b>{analytics.entries}</b></div>
            <div>Average score: <b>{(analytics.avgScore || 0).toFixed(2)}</b></div>
          </div>
        </div>
      )}
    </div>
  );
}
