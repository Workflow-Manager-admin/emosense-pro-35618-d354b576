import React from "react";
import PremiumFeatureCard from "../components/PremiumFeatureCard";

export default function Upgrade() {
  return (
    <div className="flex flex-col items-center justify-center py-12 px-2 max-w-xl mx-auto">
      <PremiumFeatureCard />
      <div className="mt-8 mb-4 text-gray-800">
        <p>
          Enjoy unlimited journaling, AI analytics, data export, calendar sync, cloud backup, and more.<br />
          <span className="font-semibold text-indigo-700">Get MoodTrack Pro Premium for only $5/month!</span>
        </p>
      </div>
      <button className="btn btn-large bg-yellow-400 text-indigo-900 font-bold text-lg shadow mt-4">
        {/* Wire up Stripe/PayPal etc in production */}
        Subscribe Now
      </button>
    </div>
  );
}
