import React, { useState, useEffect } from 'react'
import { useAuth } from '../context/AuthContext'
import { scoreService, drawService } from '../services'
import toast from 'react-hot-toast'
import { Activity, Trophy, Heart, Calendar, Plus, Trash2, Edit2 } from 'lucide-react'

const Dashboard = () => {
  const { user } = useAuth()
  const [scores, setScores] = useState([])
  const [newScore, setNewScore] = useState({ score: '', date: '' })
  const [editingScore, setEditingScore] = useState(null)
  const [winnings, setWinnings] = useState({ total: 0, draws: [] })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchScores()
    fetchWinnings()
  }, [])

  const fetchScores = async () => {
    try {
      const data = await scoreService.getScores()
      setScores(data)
    } catch (error) {
      console.error('Error fetching scores:', error)
    } finally {
      setLoading(false)
    }
  }

  const fetchWinnings = async () => {
    try {
      const data = await drawService.getMyWinnings()
      setWinnings(data)
    } catch (error) {
      console.error('Error fetching winnings:', error)
    }
  }

  const handleAddScore = async (e) => {
    e.preventDefault()
    try {
      const data = await scoreService.addScore(newScore)
      setScores(data)
      setNewScore({ score: '', date: '' })
      toast.success('Score added successfully!')
    } catch (error) {
      toast.error(error.response?.data?.message || 'Error adding score')
    }
  }

  const handleUpdateScore = async (id) => {
    try {
      const data = await scoreService.updateScore(id, editingScore)
      setScores(data)
      setEditingScore(null)
      toast.success('Score updated successfully!')
    } catch (error) {
      toast.error('Error updating score')
    }
  }

  const handleDeleteScore = async (id) => {
    if (window.confirm('Are you sure you want to delete this score?')) {
      try {
        const data = await scoreService.deleteScore(id)
        setScores(data)
        toast.success('Score deleted successfully!')
      } catch (error) {
        toast.error('Error deleting score')
      }
    }
  }

  const getSubscriptionStatus = () => {
    if (!user?.subscription?.status) return 'Inactive'
    const status = user.subscription.status
    if (status === 'active') {
      const endDate = new Date(user.subscription.endDate)
      const daysLeft = Math.ceil((endDate - new Date()) / (1000 * 60 * 60 * 24))
      return `Active (${daysLeft} days left)`
    }
    return status.charAt(0).toUpperCase() + status.slice(1)
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm">Subscription</p>
                <p className="text-2xl font-bold text-green-600">{getSubscriptionStatus()}</p>
              </div>
              <Activity className="text-gray-400 text-2xl" />
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm">Total Won</p>
                <p className="text-2xl font-bold text-green-600">₹{winnings.total || 0}</p>
              </div>
              <Trophy className="text-gray-400 text-2xl" />
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm">Charity</p>
                <p className="text-lg font-semibold">{user?.selectedCharity?.charityId?.name || 'Not selected'}</p>
                <p className="text-sm text-gray-500">{user?.selectedCharity?.percentage || 10}% contribution</p>
              </div>
              <Heart className="text-gray-400 text-2xl" />
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm">Draws Entered</p>
                <p className="text-2xl font-bold">{winnings.draws?.length || 0}</p>
              </div>
              <Calendar className="text-gray-400 text-2xl" />
            </div>
          </div>
        </div>

        {/* Score Entry Section */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <h2 className="text-xl font-bold mb-4">Enter Your Latest Score</h2>
          <form onSubmit={handleAddScore} className="flex flex-wrap gap-4">
            <input
              type="number"
              min="1"
              max="45"
              placeholder="Stableford Score (1-45)"
              value={newScore.score}
              onChange={(e) => setNewScore({ ...newScore, score: e.target.value })}
              className="flex-1 border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
              required
            />
            <input
              type="date"
              value={newScore.date}
              onChange={(e) => setNewScore({ ...newScore, date: e.target.value })}
              className="border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
              required
            />
            <button type="submit" className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 flex items-center gap-2">
              <Plus size={18} /> Add Score
            </button>
          </form>
        </div>

        {/* Recent Scores */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-xl font-bold mb-4">Your Recent Scores (Last 5)</h2>
          {scores.length === 0 ? (
            <div className="text-center text-gray-500 py-8">
              No scores yet. Add your first golf score above!
            </div>
          ) : (
            <div className="space-y-3">
              {scores.map((score, idx) => (
                <div key={score._id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  {editingScore?._id === score._id ? (
                    <div className="flex-1 flex gap-2">
                      <input
                        type="number"
                        min="1"
                        max="45"
                        value={editingScore.score}
                        onChange={(e) => setEditingScore({ ...editingScore, score: e.target.value })}
                        className="border rounded px-2 py-1 w-20"
                      />
                      <input
                        type="date"
                        value={editingScore.date?.split('T')[0] || editingScore.date}
                        onChange={(e) => setEditingScore({ ...editingScore, date: e.target.value })}
                        className="border rounded px-2 py-1"
                      />
                      <button onClick={() => handleUpdateScore(score._id)} className="text-green-600 hover:text-green-800">Save</button>
                      <button onClick={() => setEditingScore(null)} className="text-gray-600 hover:text-gray-800">Cancel</button>
                    </div>
                  ) : (
                    <>
                      <div className="flex items-center gap-4">
                        <span className="font-bold text-lg text-gray-500">#{idx + 1}</span>
                        <span className="text-2xl font-bold text-green-600">{score.score}</span>
                        <span className="text-gray-500">{new Date(score.date).toLocaleDateString()}</span>
                      </div>
                      <div className="flex gap-2">
                        <button onClick={() => setEditingScore(score)} className="text-blue-600 hover:text-blue-800">
                          <Edit2 size={18} />
                        </button>
                        <button onClick={() => handleDeleteScore(score._id)} className="text-red-600 hover:text-red-800">
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Winnings Section */}
        {winnings.draws?.length > 0 && (
          <div className="bg-white rounded-lg shadow-sm p-6 mt-8">
            <h2 className="text-xl font-bold mb-4">Your Winnings</h2>
            <div className="space-y-3">
              {winnings.draws.map((win, idx) => (
                <div key={idx} className="flex justify-between items-center p-3 bg-yellow-50 rounded-lg border border-yellow-200">
                  <div>
                    <span className="font-semibold">{win.type} Winner</span>
                    <p className="text-sm text-gray-600">{win.month}/{win.year} Draw</p>
                  </div>
                  <div className="text-right">
                    <span className="text-xl font-bold text-green-600">₹{win.amount}</span>
                    <p className="text-sm text-gray-500">Pending Verification</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default Dashboard