import React, { useState, useEffect } from 'react'
import { useAuth } from '../../context/AuthContext'
import { adminService } from '../../services'
import { Link } from 'react-router-dom'
import {
  Users,
  Trophy,
  Heart,
  TrendingUp,
  DollarSign,
  Shield,
  Activity
} from 'lucide-react'

const AdminDashboard = () => {

  const { token } = useAuth()

  const [stats, setStats] = useState({
    totalUsers: 0,
    activeSubscriptions: 0,
    totalCharityContributions: 0,
    totalPrizePool: 0
  })

  const [recentUsers, setRecentUsers] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchStats()
    fetchUsers()
  }, [])

  const fetchStats = async () => {
    try {
      const data = await adminService.getStats()
      setStats(data)
    } catch (err) {
      console.error(err)
    }
  }

  const fetchUsers = async () => {
    try {
      const data = await adminService.getAllUsers()
      setRecentUsers(data.slice(0, 6))
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  const cards = [
    {
      title: 'Total Users',
      value: stats.totalUsers,
      icon: Users,
      color: 'bg-blue-500'
    },
    {
      title: 'Active Members',
      value: stats.activeSubscriptions,
      icon: TrendingUp,
      color: 'bg-emerald-500'
    },
    {
      title: 'Charity Impact',
      value: `₹${stats.totalCharityContributions}`,
      icon: Heart,
      color: 'bg-pink-500'
    },
    {
      title: 'Prize Pool',
      value: `₹${stats.totalPrizePool}`,
      icon: Trophy,
      color: 'bg-amber-500'
    }
  ]

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="h-12 w-12 border-4 border-emerald-600 border-t-transparent rounded-full animate-spin" />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">

      {/* HEADER */}
      <div className="bg-gradient-to-r from-gray-900 to-gray-800 text-white">
        <div className="max-w-7xl mx-auto px-6 py-10">

          <div className="flex items-center gap-3">
            <Shield className="text-emerald-400" />
            <h1 className="text-2xl font-semibold">Admin Control Panel</h1>
          </div>

          <p className="text-gray-300 mt-2 text-sm">
            Manage users, draws, charities, and system performance
          </p>

        </div>
      </div>

      {/* STATS */}
      <div className="max-w-7xl mx-auto px-6 -mt-8">

        <div className="grid md:grid-cols-4 gap-5">

          {cards.map((c, i) => (
            <div
              key={i}
              className="bg-white rounded-2xl shadow-sm border p-5 hover:shadow-md transition"
            >

              <div className="flex items-center justify-between">

                <div>
                  <p className="text-sm text-gray-500">{c.title}</p>
                  <p className="text-2xl font-bold mt-1">{c.value}</p>
                </div>

                <div className={`${c.color} text-white p-3 rounded-xl`}>
                  <c.icon size={20} />
                </div>

              </div>

            </div>
          ))}

        </div>
      </div>

      {/* MAIN GRID */}
      <div className="max-w-7xl mx-auto px-6 mt-10 grid lg:grid-cols-3 gap-6">

        {/* QUICK ACTIONS */}
        <div className="bg-white rounded-2xl border p-6 lg:col-span-1">

          <h2 className="font-semibold text-lg mb-4 flex items-center gap-2">
            <Activity size={18} /> Quick Actions
          </h2>

          <div className="space-y-3">

            <Link to="/admin/users"
              className="block bg-blue-50 text-blue-700 text-center py-2 rounded-lg hover:bg-blue-100"
            >
              Manage Users
            </Link>

            <Link to="/admin/charities"
              className="block bg-pink-50 text-pink-700 text-center py-2 rounded-lg hover:bg-pink-100"
            >
              Manage Charities
            </Link>

            <Link to="/admin/draws"
              className="block bg-emerald-50 text-emerald-700 text-center py-2 rounded-lg hover:bg-emerald-100"
            >
              Run Draws
            </Link>

            <Link to="/admin/winners"
              className="block bg-amber-50 text-amber-700 text-center py-2 rounded-lg hover:bg-amber-100"
            >
              Verify Winners
            </Link>

          </div>

        </div>

        {/* RECENT USERS */}
        <div className="bg-white rounded-2xl border p-6 lg:col-span-2">

          <h2 className="font-semibold text-lg mb-4">Recent Users</h2>

          <div className="space-y-3">

            {recentUsers.length === 0 ? (
              <p className="text-gray-500 text-sm">No users found</p>
            ) : (
              recentUsers.map(u => (
                <div
                  key={u._id}
                  className="flex items-center justify-between p-3 bg-gray-50 rounded-xl"
                >

                  <div>
                    <p className="font-medium">{u.name}</p>
                    <p className="text-xs text-gray-500">{u.email}</p>
                  </div>

                  <span className={`text-xs px-3 py-1 rounded-full ${
                    u.subscription?.status === 'active'
                      ? 'bg-emerald-100 text-emerald-700'
                      : 'bg-gray-200 text-gray-600'
                  }`}>
                    {u.subscription?.status || 'inactive'}
                  </span>

                </div>
              ))
            )}

          </div>

        </div>

      </div>

    </div>
  )
}

export default AdminDashboard