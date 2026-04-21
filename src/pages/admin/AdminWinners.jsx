import React, { useState, useEffect, useMemo } from 'react'
import { useAuth } from '../../context/AuthContext'
import axios from 'axios'
import toast from 'react-hot-toast'
import {
  FiCheckCircle,
  FiXCircle,
  FiDollarSign,
  FiEye
} from 'react-icons/fi'
import { useNavigate } from 'react-router-dom'

const AdminWinners = () => {
  const { token } = useAuth()
  const navigate = useNavigate()

  const [winners, setWinners] = useState([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState('all')
  const [selectedWinner, setSelectedWinner] = useState(null)

  // ✅ stable API instance
  const api = useMemo(() => {
    return axios.create({
      baseURL: import.meta.env.VITE_API_URL,
      headers: { Authorization: `Bearer ${token}` }
    })
  }, [token])

  useEffect(() => {
    fetchWinners()
  }, [])

  const fetchWinners = async () => {
    try {
      const res = await api.get('/admin/winners')
      setWinners(res.data?.winners || [])
    } catch (error) {
      console.error(error)
      toast.error('Failed to load winners')
    } finally {
      setLoading(false)
    }
  }

  const verifyWinner = async (winnerId, status) => {
    try {
      await api.put(`/admin/winners/${winnerId}/verify`, { status })
      toast.success(`Winner ${status}`)
      setSelectedWinner(null)
      fetchWinners()
    } catch (error) {
      toast.error(error?.response?.data?.message || 'Update failed')
    }
  }

  const filteredWinners = useMemo(() => {
    return filter === 'all'
      ? winners
      : winners.filter(w => w.status === filter)
  }, [winners, filter])

  const getStatusBadge = (status) => {
    const map = {
      paid: 'bg-green-100 text-green-800',
      approved: 'bg-blue-100 text-blue-800',
      pending: 'bg-yellow-100 text-yellow-800',
      rejected: 'bg-red-100 text-red-800'
    }

    return (
      <span className={`px-2 py-1 rounded-full text-xs ${map[status] || 'bg-gray-100'}`}>
        {status}
      </span>
    )
  }

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
          <div className="p-6 border-b flex justify-between flex-wrap gap-3">

            <h1 className="text-2xl font-bold">Winner Verification</h1>

            <div className="flex gap-2 flex-wrap">
              {['all', 'pending', 'approved', 'paid'].map(type => (
                <button
                  key={type}
                  onClick={() => setFilter(type)}
                  className={`px-3 py-1 rounded text-sm ${
                    filter === type
                      ? 'bg-green-600 text-white'
                      : 'bg-gray-200'
                  }`}
                >
                  {type}
                </button>
              ))}
            </div>

          </div>

          {/* LIST */}
          <div className="p-6 space-y-4">

            {filteredWinners.length === 0 ? (
              <div className="text-center text-gray-500 py-10">
                No winners found
              </div>
            ) : (
              filteredWinners.map(winner => (
                <div
                  key={winner._id}
                  className="border rounded-lg p-4"
                >

                  <div className="flex justify-between flex-wrap gap-4">

                    <div>
                      <h3 className="font-semibold">
                        {winner.userId?.name || 'Anonymous'}
                      </h3>
                      <p className="text-sm text-gray-500">
                        {winner.userId?.email}
                      </p>

                      <div className="text-sm mt-2 space-x-4">
                        <span>Match: {winner.matchType}</span>
                        <span>₹{winner.amount}</span>
                      </div>

                      {winner.proofImage && (
                        <button
                          onClick={() => setSelectedWinner(winner)}
                          className="text-blue-600 text-sm flex items-center gap-1 mt-2"
                        >
                          <FiEye /> View Proof
                        </button>
                      )}
                    </div>

                    <div className="flex items-center gap-2">
                      {getStatusBadge(winner.status)}

                      {winner.status === 'pending' && (
                        <>
                          <button
                            onClick={() => verifyWinner(winner._id, 'approved')}
                            className="bg-blue-600 text-white px-3 py-1 rounded text-sm"
                          >
                            <FiCheckCircle />
                          </button>

                          <button
                            onClick={() => verifyWinner(winner._id, 'rejected')}
                            className="bg-red-600 text-white px-3 py-1 rounded text-sm"
                          >
                            <FiXCircle />
                          </button>
                        </>
                      )}

                      {winner.status === 'approved' && (
                        <button
                          onClick={() => verifyWinner(winner._id, 'paid')}
                          className="bg-green-600 text-white px-3 py-1 rounded text-sm"
                        >
                          <FiDollarSign />
                        </button>
                      )}
                    </div>

                  </div>

                </div>
              ))
            )}

          </div>

        </div>
      </div>

      {/* MODAL */}
      {selectedWinner && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center p-4">

          <div className="bg-white rounded-lg p-6 max-w-lg w-full">

            <h2 className="text-xl font-bold mb-4">Proof</h2>

            <p>{selectedWinner.userId?.name}</p>

            <img
              src={selectedWinner.proofImage || ''}
              alt="proof"
              className="w-full rounded mt-4"
            />

            <button
              onClick={() => setSelectedWinner(null)}
              className="mt-4 w-full bg-gray-300 py-2 rounded"
            >
              Close
            </button>

          </div>

        </div>
      )}

    </div>
  )
}

export default AdminWinners