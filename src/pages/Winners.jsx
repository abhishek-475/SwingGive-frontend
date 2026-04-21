import React, { useState, useEffect } from 'react'
import { Trophy, User, Calendar, DollarSign } from 'lucide-react'
import { winnerService } from '../services'

const Winners = () => {
  const [winners, setWinners] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchWinners()
  }, [])

  const fetchWinners = async () => {
    try {
      const data = await winnerService.getAllWinners()

      // safe fallback for different backend shapes
      setWinners(data?.winners || data || [])
    } catch (error) {
      console.error('Error fetching winners:', error)
      setWinners([])
    } finally {
      setLoading(false)
    }
  }

  const getMatchTypeColor = (type) => {
    switch (type) {
      case 'fiveMatch':
      case '5-match':
        return 'bg-yellow-100 text-yellow-800'

      case 'fourMatch':
      case '4-match':
        return 'bg-blue-100 text-blue-800'

      case 'threeMatch':
      case '3-match':
        return 'bg-green-100 text-green-800'

      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="h-10 w-10 border-4 border-green-600 border-t-transparent rounded-full animate-spin"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">

      <div className="max-w-7xl mx-auto px-4">

        {/* HEADER */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-3">
            Recent Winners
          </h1>
          <p className="text-gray-600">
            Transparent monthly draw results
          </p>
        </div>

        {/* LIST */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden">

          {winners.length === 0 ? (
            <div className="text-center py-12">
              <Trophy className="text-gray-400 mx-auto mb-4" size={48} />
              <p className="text-gray-500">No winners announced yet</p>
              <p className="text-gray-400 text-sm mt-1">
                Check back after next draw
              </p>
            </div>
          ) : (
            <div className="divide-y">

              {winners.map((winner, idx) => (
                <div key={idx} className="p-6 flex justify-between items-center">

                  {/* LEFT SIDE */}
                  <div className="flex items-center gap-4">

                    {/* avatar */}
                    <div className="w-11 h-11 bg-green-100 rounded-full flex items-center justify-center">
                      <User className="text-green-600" size={18} />
                    </div>

                    {/* info */}
                    <div>
                      <p className="font-semibold text-gray-900">
                        {winner?.userId?.name || 'Anonymous User'}
                      </p>

                      <div className="flex flex-wrap gap-3 text-sm text-gray-500 mt-1">

                        <span className="flex items-center gap-1">
                          <Calendar size={14} />
                          {winner?.drawId?.month}/{winner?.drawId?.year}
                        </span>

                        <span className="flex items-center gap-1">
                          <DollarSign size={14} />
                          ₹{winner?.amount || 0}
                        </span>

                      </div>
                    </div>
                  </div>

                  {/* RIGHT SIDE */}
                  <span className={`px-3 py-1 text-xs rounded-full ${getMatchTypeColor(winner?.matchType)}`}>
                    {winner?.matchType || 'N/A'}
                  </span>

                </div>
              ))}

            </div>
          )}

        </div>

      </div>

    </div>
  )
}

export default Winners