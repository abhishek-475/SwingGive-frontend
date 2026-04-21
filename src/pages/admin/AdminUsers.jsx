import React, { useState, useEffect, useMemo } from 'react'
import { useAuth } from '../../context/AuthContext'
import axios from 'axios'
import toast from 'react-hot-toast'
import { FiSearch, FiEdit2, FiCheck, FiX } from 'react-icons/fi'
import { useNavigate } from 'react-router-dom'

const AdminUsers = () => {
  const { token } = useAuth()
  const navigate = useNavigate()

  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [editingUser, setEditingUser] = useState(null)

  // stable axios instance
  const api = useMemo(() => {
    return axios.create({
      baseURL: import.meta.env.VITE_API_URL,
      headers: { Authorization: `Bearer ${token}` }
    })
  }, [token])

  useEffect(() => {
    fetchUsers()
  }, [])

  const fetchUsers = async () => {
    try {
      const res = await api.get('/admin/users')
      setUsers(res.data || [])
    } catch (err) {
      console.error(err)
      toast.error('Failed to load users')
    } finally {
      setLoading(false)
    }
  }

  const handleUpdateUser = async (id, data) => {
    try {
      await api.put(`/admin/users/${id}`, data)
      toast.success('User updated')
      setEditingUser(null)
      fetchUsers()
    } catch (err) {
      toast.error(err?.response?.data?.message || 'Update failed')
    }
  }

  const filteredUsers = useMemo(() => {
    return users.filter(u =>
      u.name?.toLowerCase().includes(search.toLowerCase()) ||
      u.email?.toLowerCase().includes(search.toLowerCase())
    )
  }, [users, search])

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        Loading...
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-100 py-8">

      <div className="max-w-7xl mx-auto px-4">

        {/* BACK */}
        <button
          onClick={() => navigate('/admin')}
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

          {/* EMPTY STATE */}
          {filteredUsers.length === 0 ? (
            <div className="text-center py-10 text-gray-500">
              No users found
            </div>
          ) : (

            <>
              {/* TABLE */}
              <div className="hidden md:block overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs">Name</th>
                      <th className="px-6 py-3 text-left text-xs">Email</th>
                      <th className="px-6 py-3 text-left text-xs">Subscription</th>
                      <th className="px-6 py-3 text-left text-xs">Total Won</th>
                      <th className="px-6 py-3 text-left text-xs">Actions</th>
                    </tr>
                  </thead>

                  <tbody className="divide-y">
                    {filteredUsers.map(user => (
                      <tr key={user._id} className="hover:bg-gray-50">

                        <td className="px-6 py-4">
                          {editingUser?._id === user._id ? (
                            <input
                              value={editingUser.name || ''}
                              onChange={(e) =>
                                setEditingUser({ ...editingUser, name: e.target.value })
                              }
                              className="border px-2 py-1 rounded"
                            />
                          ) : user.name}
                        </td>

                        <td className="px-6 py-4">{user.email}</td>

                        <td className="px-6 py-4">
                          <select
                            value={
                              editingUser?._id === user._id
                                ? editingUser?.subscription?.status || 'inactive'
                                : user?.subscription?.status || 'inactive'
                            }
                            disabled={editingUser?._id !== user._id}
                            onChange={(e) =>
                              setEditingUser({
                                ...editingUser,
                                subscription: {
                                  ...(editingUser?.subscription || {}),
                                  status: e.target.value
                                }
                              })
                            }
                            className="border px-2 py-1 rounded"
                          >
                            <option value="active">Active</option>
                            <option value="inactive">Inactive</option>
                            <option value="cancelled">Cancelled</option>
                          </select>
                        </td>

                        <td className="px-6 py-4">₹{user.totalWon || 0}</td>

                        <td className="px-6 py-4">
                          {editingUser?._id === user._id ? (
                            <div className="flex gap-2">
                              <button onClick={() => handleUpdateUser(user._id, editingUser)}>
                                <FiCheck className="text-green-600" />
                              </button>
                              <button onClick={() => setEditingUser(null)}>
                                <FiX className="text-red-600" />
                              </button>
                            </div>
                          ) : (
                            <button onClick={() => setEditingUser(user)}>
                              <FiEdit2 className="text-blue-600" />
                            </button>
                          )}
                        </td>

                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

            </>
          )}

        </div>
      </div>
    </div>
  )
}

export default AdminUsers