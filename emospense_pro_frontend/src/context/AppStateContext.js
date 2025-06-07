import React, { createContext, useContext, useReducer } from "react";
import { MoodAPI, JournalAPI, PremiumAPI } from "../api/client";

// PUBLIC_INTERFACE
const AppStateContext = createContext();

export function useAppState() {
  return useContext(AppStateContext);
}

const initial = {
  moods: [],
  journals: [],
  trends: null,
  recommendations: [],
  analytics: null,
  loading: false,
};

function reducer(state, action) {
  switch (action.type) {
    case "SET_MOODS":
      return { ...state, moods: action.payload };
    case "SET_JOURNALS":
      return { ...state, journals: action.payload };
    case "SET_TRENDS":
      return { ...state, trends: action.payload };
    case "SET_RECOMMENDATIONS":
      return { ...state, recommendations: action.payload };
    case "SET_ANALYTICS":
      return { ...state, analytics: action.payload };
    case "SET_LOADING":
      return { ...state, loading: action.payload };
    default:
      return state;
  }
}

// PUBLIC_INTERFACE
export function AppStateProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initial);

  // Async actions (can be wrapped in hooks for real-world apps)
  const fetchMoods = async () => {
    dispatch({ type: "SET_LOADING", payload: true });
    try {
      const moods = await MoodAPI.list();
      dispatch({ type: "SET_MOODS", payload: moods });
    } finally {
      dispatch({ type: "SET_LOADING", payload: false });
    }
  };

  const fetchJournals = async () => {
    dispatch({ type: "SET_LOADING", payload: true });
    try {
      const journals = await JournalAPI.list();
      dispatch({ type: "SET_JOURNALS", payload: journals });
    } finally {
      dispatch({ type: "SET_LOADING", payload: false });
    }
  };

  const fetchAnalytics = async () => {
    dispatch({ type: "SET_LOADING", payload: true });
    try {
      const analytics = await PremiumAPI.analytics();
      dispatch({ type: "SET_ANALYTICS", payload: analytics });
    } finally {
      dispatch({ type: "SET_LOADING", payload: false });
    }
  };

  return (
    <AppStateContext.Provider value={{
      ...state,
      dispatch,
      fetchMoods,
      fetchJournals,
      fetchAnalytics
    }}>
      {children}
    </AppStateContext.Provider>
  );
}
