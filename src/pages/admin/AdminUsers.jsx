import React, { useState, useEffect, useMemo } from "react";
import { useAuth } from "../../context/AuthContext";
import axios from "axios";
import toast from "react-hot-toast";
import { FiSearch, FiEdit2, FiCheck, FiX } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

const AdminUsers = () => {
  const { token } = useAuth();
  const navigate = useNavigate();

  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [editingUser, setEditingUser] = useState(null);

  const api = useMemo(() => {
    return axios.create({
      baseURL: import.meta.env.VITE_API_URL,
      headers: { Authorization: `Bearer ${token}` },
    });
  }, [token]);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const res = await api.get("/admin/users");
      setUsers(res.data || []);
    } catch (err) {
      console.error(err);
      toast.error("Failed to load users");
    } finally {
      setLoading(false);
    }
  };

  // ✅ FIXED: Proper edit initialization
  const startEdit = (user) => {
    setEditingUser({
      ...user,
      subscription: {
        status: user?.subscription?.status || "inactive",
      },
    });
  };

  // ✅ FIXED: Safe nested update
  const handleSubscriptionChange = (value) => {
    setEditingUser((prev) => ({
      ...prev,
      subscription: {
        ...prev.subscription,
        status: value,
      },
    }));
  };

  const handleUpdateUser = async (id) => {
    try {
      await api.put(`/admin/users/${id}`, {
        name: editingUser.name,
        subscription: {
          status: editingUser.subscription.status,
        },
      });

      toast.success("User updated");
      setEditingUser(null);
      fetchUsers();
    } catch (err) {
      toast.error(err?.response?.data?.message || "Update failed");
    }
  };

  const filteredUsers = useMemo(() => {
    return users.filter(
      (u) =>
        u.name?.toLowerCase().includes(search.toLowerCase()) ||
        u.email?.toLowerCase().includes(search.toLowerCase())
    );
  }, [users, search]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        Loading...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="max-w-7xl mx-auto px-4">

        {/* BACK */}
        <button
          onClick={() => navigate("/admin")}
          className="mb-4 text-sm text-gray-600 hover:text-emerald-600"
        >
          ← Back to Dashboard
        </button>

        <div className="bg-white rounded-lg shadow-md">

          {/* HEADER */}
          <div className="p-6 border-b flex flex-col md:flex-row justify-between gap-4">
            <h1 className="text-2xl font-bold">User Management</h1>

            <div className="relative">
              <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search users..."
                className="pl-10 pr-4 py-2 border rounded-lg"
              />
            </div>
          </div>

          {/* EMPTY */}
          {filteredUsers.length === 0 ? (
            <div className="text-center py-10 text-gray-500">
              No users found
            </div>
          ) : (
            <div className="overflow-x-auto -mx-4 md:mx-0">
              <div className="min-w-[700px] md:min-w-full">

                <table className="w-full text-sm md:text-base">

                  {/* HEADER */}
                  <thead className="bg-gray-50 sticky top-0 z-10">
                    <tr className="text-left">
                      <th className="px-4 md:px-6 py-3">Name</th>
                      <th className="px-4 md:px-6 py-3">Email</th>
                      <th className="px-4 md:px-6 py-3">Subscription</th>
                      <th className="px-4 md:px-6 py-3">Total Won</th>
                      <th className="px-4 md:px-6 py-3">Actions</th>
                    </tr>
                  </thead>

                  {/* BODY */}
                  <tbody className="divide-y">
                    {filteredUsers.map((user) => (
                      <tr key={user._id} className="hover:bg-gray-50">

                        {/* NAME */}
                        <td className="px-4 md:px-6 py-3">
                          {editingUser?._id === user._id ? (
                            <input
                              value={editingUser.name || ""}
                              onChange={(e) =>
                                setEditingUser((prev) => ({
                                  ...prev,
                                  name: e.target.value,
                                }))
                              }
                              className="border px-2 py-1 rounded w-28 md:w-auto"
                            />
                          ) : (
                            <span className="font-medium">{user.name}</span>
                          )}
                        </td>

                        {/* EMAIL */}
                        <td className="px-4 md:px-6 py-3 text-gray-600">
                          {user.email}
                        </td>

                        {/* SUBSCRIPTION */}
                        <td className="px-4 md:px-6 py-3">
                          <select
                            value={
                              editingUser?._id === user._id
                                ? editingUser?.subscription?.status
                                : user?.subscription?.status || "inactive"
                            }
                            disabled={!editingUser || editingUser._id !== user._id}
                            onChange={(e) =>
                              handleSubscriptionChange(e.target.value)
                            }
                            className="border px-2 py-1 rounded"
                          >
                            <option value="active">Active</option>
                            <option value="inactive">Inactive</option>
                            <option value="cancelled">Cancelled</option>
                          </select>
                        </td>

                        {/* TOTAL WON */}
                        <td className="px-4 md:px-6 py-3 font-semibold">
                          ₹{user.totalWon || 0}
                        </td>

                        {/* ACTIONS */}
                        <td className="px-4 md:px-6 py-3">
                          {editingUser?._id === user._id ? (
                            <div className="flex gap-3 items-center">
                              <button
                                onClick={() =>
                                  handleUpdateUser(user._id)
                                }
                              >
                                <FiCheck className="text-green-600 text-lg" />
                              </button>

                              <button onClick={() => setEditingUser(null)}>
                                <FiX className="text-red-600 text-lg" />
                              </button>
                            </div>
                          ) : (
                            <button onClick={() => startEdit(user)}>
                              <FiEdit2 className="text-blue-600 text-lg" />
                            </button>
                          )}
                        </td>

                      </tr>
                    ))}
                  </tbody>
                </table>

              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};

export default AdminUsers;