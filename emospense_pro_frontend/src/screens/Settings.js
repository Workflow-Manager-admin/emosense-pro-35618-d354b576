import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { AuthAPI } from "../api/client";
import Badge from "../components/Badge";
import { toast } from "react-hot-toast";

export default function SettingsScreen() {
  const { user, setUser, logout, isPremium } = useAuth();
  const [name, setName] = useState(user?.name || "");
  const [saving, setSaving] = useState(false);

  const save = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      await AuthAPI.updateMe({ name });
      setUser({ ...user, name });
      toast.success("Profile updated!");
    } catch {
      toast.error("Update failed.");
    }
    setSaving(false);
  };

  return (
    <div className="max-w-xl mx-auto py-10">
      <h2 className="text-2xl font-bold mb-4">Account Settings</h2>
      <form className="flex flex-col gap-3" onSubmit={save}>
        <label>
          <div className="font-medium mb-1">Email</div>
          <input disabled className="border rounded p-2 w-full bg-gray-100" value={user?.email || ""} />
        </label>
        <label>
          <div className="font-medium mb-1">Name</div>
          <input
            className="border rounded p-2 w-full"
            value={name}
            onChange={e => setName(e.target.value)}
          />
        </label>
        <div className="flex gap-2 items-center mt-2">
          <Badge label={user?.role} color={isPremium ? "yellow" : "gray"} />
          {isPremium && <span>Premium user</span>}
        </div>
        <button className="btn btn-large mt-4" type="submit" disabled={saving}>
          Save
        </button>
      </form>
      <hr className="my-6" />
      <button className="btn bg-red-100 text-red-700" onClick={logout}>Logout</button>
    </div>
  );
}
