import React, { useEffect } from "react";
import { useAppState } from "../context/AppStateContext";
import { useAuth } from "../context/AuthContext";
import { Link } from "react-router-dom";
import MoodLog from "../components/MoodLog";
import PremiumFeatureCard from "../components/PremiumFeatureCard";

export default function Dashboard() {
  const { fetchMoods, fetchJournals, moods, journals, analytics, fetchAnalytics } = useAppState();
  const { isPremium } = useAuth();

  useEffect(() => {
    fetchMoods();
    fetchJournals();
    if (isPremium) fetchAnalytics();
    // eslint-disable-next-line
  }, []);

  return (
    <div className="max-w-3xl mx-auto py-8">
      <h1 className="text-3xl font-bold mb-2">Welcome to MoodTrack Pro</h1>
      <div className="mb-4">
        <MoodLog compact />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Link to="/journal" className="rounded-md p-4 border hover:shadow bg-white">
          <div className="text-2xl mb-2">📒</div>
          <div className="font-semibold">New Journal Entry</div>
          <div className="text-xs text-gray-600">Reflect on your day with a journal.</div>
        </Link>
        <Link to="/trends" className="rounded-md p-4 border hover:shadow bg-white">
          <div className="text-2xl mb-2">📈</div>
          <div className="font-semibold">Mood Trends</div>
          <div className="text-xs text-gray-600">See your mood over time.</div>
        </Link>
      </div>
      <div className="mt-8">
        <div className="font-bold mb-2 text-lg">Your Insights</div>
        <div className="grid grid-cols-2 gap-4">
          <div className="rounded p-4 bg-indigo-50 text-center">
            <div className="text-sm text-gray-500">Mood Logs</div>
            <div className="text-2xl text-indigo-700">{moods.length}</div>
          </div>
          <div className="rounded p-4 bg-indigo-50 text-center">
            <div className="text-sm text-gray-500">Journal Entries</div>
            <div className="text-2xl text-indigo-700">{journals.length}</div>
          </div>
        </div>
      </div>
      <div className="my-8">
        {!isPremium && <PremiumFeatureCard />}
      </div>
    </div>
  );
}
