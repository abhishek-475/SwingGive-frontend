import React from 'react'
import { Link } from 'react-router-dom'
import { Target, TrendingUp, Trophy, Gift, Heart, Users } from 'lucide-react'

const HowItWorks = () => {
  const steps = [
    {
      icon: Target,
      title: 'Subscribe & Register',
      description: 'Choose your monthly or yearly plan and create your account. Select a charity to support with 10% of your subscription.',
      step: 1
    },
    {
      icon: TrendingUp,
      title: 'Enter Your Scores',
      description: 'Log your latest 5 Stableford scores (1-45 points). Your scores determine your eligibility for draws.',
      step: 2
    },
    {
      icon: Trophy,
      title: 'Monthly Draw',
      description: 'Every month, we run a draw using random or algorithmic selection. Match numbers to win prizes!',
      step: 3
    },
    {
      icon: Gift,
      title: 'Win Prizes',
      description: 'Prizes are distributed based on match type: 40% for 5-number match, 35% for 4-number, 25% for 3-number.',
      step: 4
    },
    {
      icon: Heart,
      title: 'Charity Impact',
      description: 'Your subscription automatically contributes to your chosen charity. See the impact you\'re making.',
      step: 5
    },
    {
      icon: Users,
      title: 'Community',
      description: 'Join a community of golfers making a difference. Track your performance and compete with others.',
      step: 6
    }
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero */}
      <div className="bg-gradient-to-br from-green-600 to-green-800 text-white py-16">
        <div className="max-w-4xl mx-auto text-center px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">How SwingGive Works</h1>
          <p className="text-xl opacity-90">
            Simple steps to start playing, winning, and making a difference
          </p>
        </div>
      </div>

      {/* Steps */}
      <div className="max-w-4xl mx-auto px-4 py-16">
        <div className="space-y-8">
          {steps.map((step, idx) => (
            <div key={idx} className="bg-white rounded-lg shadow-md p-6 flex items-start gap-6">
              <div className="flex-shrink-0">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
                  <step.icon className="text-green-600 w-8 h-8" />
                </div>
              </div>
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <span className="bg-green-600 text-white w-6 h-6 rounded-full flex items-center justify-center text-sm font-bold">
                    {step.step}
                  </span>
                  <h3 className="text-xl font-bold text-gray-900">{step.title}</h3>
                </div>
                <p className="text-gray-600">{step.description}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Prize Distribution */}
        <div className="bg-white rounded-lg shadow-md p-6 mt-8">
          <h2 className="text-2xl font-bold text-center mb-6">Prize Pool Distribution</h2>
          <div className="grid md:grid-cols-3 gap-4">
            <div className="text-center p-4 bg-green-50 rounded-lg">
              <div className="text-3xl font-bold text-green-600">40%</div>
              <div className="font-semibold">5-Number Match</div>
              <div className="text-sm text-gray-500">Jackpot (Rollover)</div>
            </div>
            <div className="text-center p-4 bg-green-50 rounded-lg">
              <div className="text-3xl font-bold text-green-600">35%</div>
              <div className="font-semibold">4-Number Match</div>
              <div className="text-sm text-gray-500">Fixed Prize</div>
            </div>
            <div className="text-center p-4 bg-green-50 rounded-lg">
              <div className="text-3xl font-bold text-green-600">25%</div>
              <div className="font-semibold">3-Number Match</div>
              <div className="text-sm text-gray-500">Fixed Prize</div>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center mt-12">
          <Link to="/register" className="bg-green-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-green-700 inline-block">
            Get Started Now
          </Link>
        </div>
      </div>
    </div>
  )
}

export default HowItWorks