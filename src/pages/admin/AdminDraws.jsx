import React, { useState, useEffect } from 'react'
import { useAuth } from '../../context/AuthContext'
import { adminService, drawService } from '../../services'
import toast from 'react-hot-toast'
import { RefreshCw, CheckCircle } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

const AdminDraws = () => {
  const { token } = useAuth()
  const navigate = useNavigate()

  const [draws, setDraws] = useState([])
  const [loading, setLoading] = useState(true)
  const [runningDraw, setRunningDraw] = useState(false)
  const [drawType, setDrawType] = useState('random')

  useEffect(() => {
    fetchDraws()
  }, [])

  const fetchDraws = async () => {
    try {
      const data = await drawService.getAllDraws()
      setDraws(data || [])
    } catch (error) {
      console.error(error)
      toast.error('Failed to load draws')
    } finally {
      setLoading(false)
    }
  }

  const runDraw = async () => {
    setRunningDraw(true)
    try {
      await adminService.runDraw(drawType)
      toast.success('Draw completed successfully!')
      fetchDraws()
    } catch (error) {
      toast.error(error?.response?.data?.message || 'Error running draw')
    } finally {
      setRunningDraw(false)
    }
  }

  const publishDraw = async (drawId) => {
    try {
      await adminService.publishDraw(drawId)
      toast.success('Draw published successfully!')
      fetchDraws()
    } catch (error) {
      toast.error('Error publishing draw')
    }
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="max-w-7xl mx-auto px-4">

        {/* Back */}
        <div className="mb-4">
          <button
            onClick={() => navigate('/admin')}
            className="text-sm text-gray-600 hover:text-emerald-600"
          >
            ← Back to Dashboard
          </button>
        </div>

        {/* RUN DRAW */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-xl font-bold mb-4">Run Monthly Draw</h2>

          <div className="flex gap-4 items-end">
            <div className="flex-1">
              <label className="block text-sm font-medium mb-2">Draw Type</label>
              <select
                value={drawType}
                onChange={(e) => setDrawType(e.target.value)}
                className="w-full border rounded-lg px-3 py-2"
              >
                <option value="random">Random</option>
                <option value="algorithmic">Algorithmic</option>
              </select>
            </div>

            <button
              onClick={runDraw}
              disabled={runningDraw}
              className="bg-green-600 text-white px-6 py-2 rounded-lg flex items-center gap-2 disabled:opacity-50"
            >
              <RefreshCw size={18} className={runningDraw ? 'animate-spin' : ''} />
              {runningDraw ? 'Running...' : 'Run Draw'}
            </button>
          </div>
        </div>

        {/* DRAW LIST */}
        <div className="bg-white rounded-lg shadow-md">
          <div className="p-6 border-b">
            <h2 className="text-xl font-bold">Previous Draws</h2>
          </div>

          <div className="p-6 space-y-4">

            {draws.length === 0 ? (
              <p className="text-center text-gray-500">
                No draws available yet
              </p>
            ) : (
              draws.map(draw => (
                <div key={draw._id} className="border rounded-lg p-4">

                  <div className="flex justify-between mb-3">
                    <div>
                      <h3 className="font-semibold">
                        Draw {draw.month}/{draw.year}
                      </h3>
                      <p className="text-sm text-gray-500">{draw.drawType}</p>
                    </div>

                    <div className="flex gap-2 items-center">
                      {draw.status === 'pending' && (
                        <button
                          onClick={() => publishDraw(draw._id)}
                          className="bg-blue-600 text-white px-3 py-1 rounded text-sm flex items-center gap-1"
                        >
                          <CheckCircle size={14} />
                          Publish
                        </button>
                      )}

                      <span className="px-2 py-1 text-xs rounded bg-gray-100">
                        {draw.status}
                      </span>
                    </div>
                  </div>

                  {/* NUMBERS */}
                  {draw.winningNumbers && (
                    <div className="grid grid-cols-3 gap-3 text-center">

                      <div className="bg-gray-50 p-2 rounded">
                        <p className="text-xs">5 Match</p>
                        <p className="font-mono font-bold">
                          {draw.winningNumbers.fiveMatch}
                        </p>
                        <p className="text-green-600 text-sm">
                          ₹{draw.prizePool?.fiveMatch || 0}
                        </p>
                      </div>

                      <div className="bg-gray-50 p-2 rounded">
                        <p className="text-xs">4 Match</p>
                        <p className="font-mono font-bold">
                          {draw.winningNumbers.fourMatch}
                        </p>
                        <p className="text-green-600 text-sm">
                          ₹{draw.prizePool?.fourMatch || 0}
                        </p>
                      </div>

                      <div className="bg-gray-50 p-2 rounded">
                        <p className="text-xs">3 Match</p>
                        <p className="font-mono font-bold">
                          {draw.winningNumbers.threeMatch}
                        </p>
                        <p className="text-green-600 text-sm">
                          ₹{draw.prizePool?.threeMatch || 0}
                        </p>
                      </div>

                    </div>
                  )}

                </div>
              ))
            )}

          </div>
        </div>
      </div>
    </div>
  )
}

export default AdminDraws