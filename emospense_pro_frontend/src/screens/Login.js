import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";

export default function LoginScreen() {
  const { login } = useAuth();
  const nav = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await login(form.email, form.password);
      toast.success("Welcome back!");
      nav("/dashboard");
    } catch (e) {
      toast.error(e.message || "Login failed");
    }
    setLoading(false);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-indigo-50 px-3">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
        <h1 className="font-bold text-2xl mb-4 text-indigo-700">Login to MoodTrack Pro</h1>
        <form className="flex flex-col gap-3" onSubmit={submit}>
          <input
            type="email"
            required
            placeholder="Email"
            className="p-2 border rounded"
            value={form.email}
            onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
          />
          <input
            type="password"
            required
            placeholder="Password"
            className="p-2 border rounded"
            value={form.password}
            onChange={e => setForm(f => ({ ...f, password: e.target.value }))}
          />
          <button className="btn btn-large mt-2" type="submit" disabled={loading}>
            {loading ? "Logging in..." : "Log In"}
          </button>
          <div className="text-sm mt-2 text-center">
            Don't have an account?{" "}
            <Link to="/register" className="text-indigo-700 font-medium hover:underline">Sign up</Link>
          </div>
        </form>
      </div>
    </div>
  );
}
