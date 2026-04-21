import React, { useState, useEffect } from 'react'
import { drawService } from '../services'
import { Sparkles, Trophy, Calendar } from 'lucide-react'

const Draws = () => {
  const [draws, setDraws] = useState([])
  const [currentDraw, setCurrentDraw] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    init()
  }, [])

  const init = async () => {
    setLoading(true)
    try {
      const [all, current] = await Promise.all([
        drawService.getAllDraws(),
        drawService.getCurrentDraw()
      ])

      setDraws(Array.isArray(all) ? all : [])
      setCurrentDraw(current)
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  const Badge = ({ children }) => (
    <span className="px-3 py-1 text-xs rounded-full bg-emerald-50 text-emerald-700 border border-emerald-100">
      {children}
    </span>
  )

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="h-12 w-12 border-4 border-emerald-600 border-t-transparent rounded-full animate-spin" />
      </div>
    )
  }

  const publishedDraws = draws.filter(d => d.status === 'published')

  const NumberCard = ({ label, value }) => (
    <div className="bg-white/80 backdrop-blur border rounded-2xl p-6 text-center shadow-sm hover:shadow-md transition">
      <p className="text-gray-500 text-sm">{label}</p>
      <p className="text-3xl font-bold mt-2 tracking-wide">
        {value || '—'}
      </p>
    </div>
  )

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">

      {/* HERO */}
      <div className="bg-gradient-to-r from-emerald-700 to-emerald-900 text-white">
        <div className="max-w-6xl mx-auto px-6 py-20 text-center">
          <Sparkles className="mx-auto mb-4" />
          <h1 className="text-4xl font-bold">Monthly Draws</h1>
          <p className="mt-3 text-emerald-100">
            Transparent, fair & fully verifiable reward system
          </p>
        </div>
      </div>

      {/* CURRENT DRAW */}
      <div className="max-w-6xl mx-auto px-6 mt-12">

        <div className="flex items-center gap-2 mb-6">
          <Trophy className="text-emerald-600" size={18} />
          <h2 className="text-xl font-semibold">Current Draw</h2>
        </div>

        {!currentDraw || currentDraw.message ? (
          <div className="text-gray-500">{currentDraw?.message || 'No active draw'}</div>
        ) : (
          <div className="grid md:grid-cols-3 gap-6">

            <NumberCard
              label="5 Match"
              value={currentDraw?.winningNumbers?.fiveMatch}
            />

            <NumberCard
              label="4 Match"
              value={currentDraw?.winningNumbers?.fourMatch}
            />

            <NumberCard
              label="3 Match"
              value={currentDraw?.winningNumbers?.threeMatch}
            />

          </div>
        )}
      </div>

      {/* HISTORY */}
      <div className="max-w-6xl mx-auto px-6 mt-16 pb-20">

        <div className="flex items-center gap-2 mb-6">
          <Calendar size={18} className="text-emerald-600" />
          <h2 className="text-xl font-semibold">Past Draws</h2>
        </div>

        {publishedDraws.length === 0 ? (
          <p className="text-gray-500">No draws available yet</p>
        ) : (
          <div className="space-y-5">

            {publishedDraws.map(draw => (
              <div
                key={draw._id}
                className="bg-white border rounded-2xl p-6 hover:shadow-md transition"
              >

                {/* Header */}
                <div className="flex justify-between items-center mb-4">
                  <h3 className="font-bold text-lg">
                    {draw.month}/{draw.year}
                  </h3>
                  <Badge>{draw.status}</Badge>
                </div>

                {/* Numbers */}
                <div className="grid md:grid-cols-3 gap-4 text-center">

                  <div className="bg-gray-50 rounded-xl p-4">
                    <p className="text-sm text-gray-500">5 Match</p>
                    <p className="font-bold text-lg">
                      {draw.winningNumbers?.fiveMatch}
                    </p>
                  </div>

                  <div className="bg-gray-50 rounded-xl p-4">
                    <p className="text-sm text-gray-500">4 Match</p>
                    <p className="font-bold text-lg">
                      {draw.winningNumbers?.fourMatch}
                    </p>
                  </div>

                  <div className="bg-gray-50 rounded-xl p-4">
                    <p className="text-sm text-gray-500">3 Match</p>
                    <p className="font-bold text-lg">
                      {draw.winningNumbers?.threeMatch}
                    </p>
                  </div>

                </div>

              </div>
            ))}

          </div>
        )}
      </div>

    </div>
  )
}

export default Draws