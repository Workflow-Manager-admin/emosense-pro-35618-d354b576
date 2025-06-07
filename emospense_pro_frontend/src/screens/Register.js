import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";

export default function RegisterScreen() {
  const { register } = useAuth();
  const nav = useNavigate();
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [loading, setLoading] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await register(form.email, form.password, form.name);
      toast.success("Registered! Welcome.");
      nav("/dashboard");
    } catch (e) {
      toast.error(e.message || "Registration failed");
    }
    setLoading(false);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-indigo-50 px-3">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
        <h1 className="font-bold text-2xl mb-4 text-indigo-700">Create your MoodTrack Pro account</h1>
        <form className="flex flex-col gap-3" onSubmit={submit}>
          <input
            type="text"
            required
            placeholder="Name"
            className="p-2 border rounded"
            value={form.name}
            onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
          />
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
            {loading ? "Creating..." : "Sign Up"}
          </button>
          <div className="text-sm mt-2 text-center">
            Already have an account?{" "}
            <Link to="/login" className="text-indigo-700 font-medium hover:underline">Login</Link>
          </div>
        </form>
      </div>
    </div>
  );
}
