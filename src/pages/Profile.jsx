import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import axios from "axios";
import toast from "react-hot-toast";

const Profile = () => {
  const { token, user, setUser } = useAuth();
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: user?.name || "",
    charityPercentage: user?.selectedCharity?.percentage || 10,
  });

  const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    headers: { Authorization: `Bearer ${token}` },
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await api.put(`/admin/users/${user._id}`, {
        name: formData.name,
        "selectedCharity.percentage": formData.charityPercentage,
      });

      setUser({
        ...user,
        name: formData.name,
        selectedCharity: {
          ...user.selectedCharity,
          percentage: formData.charityPercentage,
        },
      });

      toast.success("Profile updated successfully!");
    } catch (err) {
      toast.error("Failed to update profile");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">

      <div className="max-w-5xl mx-auto px-6">

        {/* PAGE HEADER */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            Account Settings
          </h1>
          <p className="text-gray-500 mt-1">
            Manage your profile, charity preferences, and account settings
          </p>
        </div>

        {/* MAIN GRID */}
        <div className="grid lg:grid-cols-3 gap-6">

          {/* LEFT SIDEBAR PROFILE CARD */}
          <div className="bg-white rounded-2xl shadow-sm border p-6 h-fit">

            <div className="flex flex-col items-center text-center">

              <div className="w-20 h-20 rounded-full bg-emerald-100 flex items-center justify-center text-2xl font-bold text-emerald-700">
                {user?.name?.charAt(0)}
              </div>

              <h2 className="mt-4 text-lg font-semibold text-gray-900">
                {user?.name}
              </h2>

              <p className="text-sm text-gray-500">{user?.email}</p>

              <div className="mt-4 text-xs px-3 py-1 rounded-full bg-emerald-100 text-emerald-700">
                {user?.role?.toUpperCase()}
              </div>

            </div>

            <div className="mt-6 border-t pt-4 text-sm text-gray-600 space-y-2">

              <p>
                💰 Total Won:{" "}
                <span className="font-semibold text-gray-900">
                  ₹{user?.totalWon || 0}
                </span>
              </p>

              <p>
                🎯 Subscription:{" "}
                <span className="font-semibold text-gray-900">
                  {user?.subscription?.status || "Inactive"}
                </span>
              </p>

            </div>

          </div>

          {/* RIGHT SETTINGS PANEL */}
          <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm border p-8">

            <form onSubmit={handleSubmit} className="space-y-10">

              {/* PERSONAL INFO */}
              <div>
                <h3 className="text-sm font-semibold text-gray-700 mb-3">
                  Personal Information
                </h3>

                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  className="w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none"
                  placeholder="Full name"
                />
              </div>

              {/* EMAIL */}
              <div>
                <h3 className="text-sm font-semibold text-gray-700 mb-3">
                  Email Address
                </h3>

                <input
                  type="email"
                  value={user?.email}
                  disabled
                  className="w-full px-4 py-3 border rounded-xl bg-gray-100 text-gray-500"
                />

                <p className="text-xs text-gray-400 mt-1">
                  Email cannot be changed
                </p>
              </div>

              {/* CHARITY */}
              <div>
                <h3 className="text-sm font-semibold text-gray-700 mb-3">
                  Charity Contribution
                </h3>

                <div className="flex justify-between text-sm text-gray-600">
                  <span>Contribution</span>
                  <span className="font-medium text-emerald-600">
                    {formData.charityPercentage}%
                  </span>
                </div>

                <input
                  type="range"
                  min="10"
                  max="100"
                  value={formData.charityPercentage}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      charityPercentage: e.target.value,
                    })
                  }
                  className="w-full mt-2 accent-emerald-600"
                />

                <p className="text-xs text-gray-400 mt-1">
                  Minimum 10% goes to your selected charity
                </p>
              </div>

              {/* CHARITY DISPLAY */}
              <div>
                <h3 className="text-sm font-semibold text-gray-700 mb-3">
                  Selected Charity
                </h3>

                <div className="px-4 py-3 rounded-xl border bg-gray-50 text-gray-700">
                  {user?.selectedCharity?.charityId?.name ||
                    "Not selected"}
                </div>
              </div>

              {/* SAVE BUTTON */}
              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 bg-emerald-600 text-white rounded-xl hover:bg-emerald-700 transition font-medium"
              >
                {loading ? "Saving changes..." : "Save Changes"}
              </button>

            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;