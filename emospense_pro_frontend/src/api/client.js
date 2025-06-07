//
// API client for MoodTrack Pro - handles all backend requests with token support
//
const API_BASE = process.env.REACT_APP_API_BASE || "http://localhost:5000/api";

function withAuth(headers = {}) {
  const token = localStorage.getItem("mtpro_token");
  return token
    ? { ...headers, Authorization: `Bearer ${token}` }
    : headers;
}

export async function api(endpoint, { method = "GET", body, token, headers = {}, ...other } = {}) {
  const opts = {
    method,
    headers: {
      "Content-Type": "application/json",
      ...withAuth(headers),
    },
    ...other,
  };
  if (body) opts.body = JSON.stringify(body);
  const res = await fetch(`${API_BASE}${endpoint}`, opts);
  if (!res.ok) {
    let msg = "Unknown error";
    try {
      const e = await res.json();
      msg = e.error || msg;
    } catch {}
    throw new Error(msg);
  }
  return await res.json();
}

// PUBLIC_INTERFACE
export const AuthAPI = {
  register: (email, password, name) => api("/auth/register", { method: "POST", body: { email, password, name } }),
  login: (email, password) => api("/auth/login", { method: "POST", body: { email, password } }),
  googleOAuth: (token) => api("/auth/oauth/google", { method: "POST", body: { token } }),
  getMe: () => api("/users/me"),
  updateMe: (fields) => api("/users/me", { method: "PUT", body: fields }),
};

export const MoodAPI = {
  create: (data) => api("/mood/", { method: "POST", body: data }),
  list: () => api("/mood/"),
  update: (id, data) => api(`/mood/${id}`, { method: "PUT", body: data }),
  delete: (id) => api(`/mood/${id}`, { method: "DELETE" }),
};

export const JournalAPI = {
  create: (data) => api("/journal/", { method: "POST", body: data }),
  list: () => api("/journal/"),
  update: (id, data) => api(`/journal/${id}`, { method: "PUT", body: data }),
  delete: (id) => api(`/journal/${id}`, { method: "DELETE" }),
};

export const AIAPI = {
  analyze: (content) => api("/ai/analyze", { method: "POST", body: { content } }),
};

export const ExportAPI = {
  csv: () => fetch(`${API_BASE}/export/csv`, { headers: withAuth(), credentials: "include" }),
  // PDF is not implemented.
};

export const PremiumAPI = {
  analytics: () => api("/premium/analytics"),
  calendarSync: () => api("/premium/calendar-sync", { method: "POST" }),
  cloudBackup: () => api("/premium/cloud-backup", { method: "POST" }),
};
