import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import {
  ArrowRight,
  ChevronRight,
  Star,
  Trophy,
  Heart,
  Calendar,
  BarChart3,
  Sparkles,
  Flag
} from 'lucide-react'


const Home = () => {
  const [activeTestimonial, setActiveTestimonial] = useState(0)

  const testimonials = [
    {
      name: "Rajesh Sharma",
      role: "Monthly Winner",
      content: "Won ₹25,000 in my first month! Seamless experience.",
      rating: 5,
      avatar: "RS"
    },
    {
      name: "Priya Patel",
      role: "Golfer",
      content: "Love combining golf with charity impact.",
      rating: 5,
      avatar: "PP"
    },
    {
      name: "Amit Kumar",
      role: "Charity Partner",
      content: "Great platform for fundraising.",
      rating: 5,
      avatar: "AK"
    }
  ]

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveTestimonial((p) => (p + 1) % testimonials.length)
    }, 4000)
    return () => clearInterval(interval)
  }, [])

  // FIXED: static Tailwind mapping (IMPORTANT)
  const featureStyles = {
    amber: "bg-amber-100 text-amber-600",
    rose: "bg-rose-100 text-rose-600",
    emerald: "bg-emerald-100 text-emerald-600"
  }

  const features = [
    {
      icon: Trophy,
      title: "Monthly Draws",
      desc: "Win up to ₹50,000 every month.",
      color: "amber"
    },
    {
      icon: Heart,
      title: "Charity Impact",
      desc: "10% goes to your chosen charity.",
      color: "rose"
    },
    {
      icon: Calendar,
      title: "Score Tracking",
      desc: "Track last 5 rounds easily.",
      color: "emerald"
    }
  ]

  return (
    <div className="bg-white text-gray-900">

      {/* HERO - Asymmetric Professional Layout */}
      <section className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 py-24 grid lg:grid-cols-12 gap-12 items-center">

          {/* Left content (focus) */}
          <div className="lg:col-span-7">

            <div className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-50 text-emerald-700 rounded-full text-sm font-medium">
              <Star size={14} /> Trusted by 1,200+ golfers
            </div>

            <h1 className="mt-6 text-5xl lg:text-6xl font-extrabold leading-tight">
              Every swing <br />
              <span className="text-emerald-600">creates impact</span>
            </h1>

            <p className="mt-6 text-lg text-gray-600 max-w-xl">
              Play golf, win monthly prizes, and support real-world charity causes in one platform.
            </p>

            <div className="mt-8 flex gap-4">
              <Link
                to="/register"
                className="px-6 py-3 bg-emerald-600 text-white rounded-xl hover:bg-emerald-700 transition"
              >
                Get Started
              </Link>

              <Link
                to="/how-it-works"
                className="px-6 py-3 border rounded-xl hover:bg-gray-50"
              >
                How it works
              </Link>
            </div>

          </div>

          {/* Right visual (premium card style) */}
          <div className="lg:col-span-5">

            <div className="relative bg-gradient-to-br from-emerald-700 to-emerald-900 rounded-3xl p-10 text-white shadow-2xl overflow-hidden">

              {/* soft glow background */}
              <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_top,white,transparent)]"></div>

              <div className="relative flex flex-col items-center text-center">

                {/* ICON STACK */}
                <div className="flex items-center gap-3">

                  <div className="p-3 rounded-xl bg-white/10">
                    <Trophy size={26} />
                  </div>

                  <div className="p-3 rounded-xl bg-white/10">
                    <Flag size={26} />
                  </div>

                  <div className="p-3 rounded-xl bg-white/10">
                    <Heart size={26} />
                  </div>

                </div>

                {/* TITLE */}
                <p className="mt-6 text-2xl font-semibold">
                  Play • Compete • Impact
                </p>

                {/* DESCRIPTION */}
                <p className="mt-3 text-sm text-emerald-100 leading-relaxed max-w-xs">
                  Every round you play contributes to fair competition, real rewards, and meaningful charity support.
                </p>

                {/* STATUS BADGE */}
                <div className="mt-6 px-4 py-2 rounded-full bg-white/10 text-xs">
                  Fully transparent reward system
                </div>

              </div>

            </div>

          </div>

        </div>
      </section>

      {/* SOCIAL PROOF STRIP */}
      <div className="max-w-7xl mx-auto px-6 py-6 flex justify-between text-sm text-gray-500">
        <span>Trusted by golfers across India</span>
        <span>Active in top clubs</span>
        <span>Growing community</span>
        <span>Real winners every month</span>
        <span>Verified draws</span>
      </div>

      {/* FEATURES - Mixed Layout (not uniform grid) */}
      <section className="relative py-28 bg-gray-50">

        {/* soft background */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(16,185,129,0.06),transparent_55%)]"></div>

        <div className="relative max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center">

          {/* LEFT STORY BLOCK */}
          <div>

            <h2 className="text-4xl font-bold text-gray-900 leading-tight">
              A smarter way to play <br />
              <span className="text-emerald-600">competitive golf</span>
            </h2>

            <p className="mt-6 text-gray-600 text-lg leading-relaxed">
              SwingGive connects golf performance with real-world impact.
              Every round you play contributes to fair competition, rewards, and charity support.
            </p>

            <div className="mt-8 space-y-4">

              <div className="flex gap-3 items-start">
                <div className="w-2 h-2 mt-2 rounded-full bg-emerald-500"></div>
                <p className="text-gray-600">
                  Transparent monthly prize system with verified winners
                </p>
              </div>

              <div className="flex gap-3 items-start">
                <div className="w-2 h-2 mt-2 rounded-full bg-emerald-500"></div>
                <p className="text-gray-600">
                  10% of every subscription supports real charities
                </p>
              </div>

              <div className="flex gap-3 items-start">
                <div className="w-2 h-2 mt-2 rounded-full bg-emerald-500"></div>
                <p className="text-gray-600">
                  Track performance and improve your golf consistency
                </p>
              </div>

            </div>

            <div className="mt-10">
              <Link
                to="/dashboard"
                className="px-6 py-3 bg-emerald-600 text-white rounded-xl hover:bg-emerald-700 transition inline-block"
              >
                Explore Platform
              </Link>
            </div>

          </div>

          {/* RIGHT BENTO GRID */}
          <div className="grid grid-cols-2 gap-5">

            {/* MAIN FEATURE CARD */}
            <div className="col-span-2 rounded-3xl p-7 bg-white border shadow-sm hover:shadow-lg transition group">

              <div className="flex gap-4 items-start">

                <div className="p-3 rounded-xl bg-emerald-50 text-emerald-600">
                  <Trophy size={22} />
                </div>

                <div>
                  <h3 className="text-lg font-semibold">
                    Monthly Prize Engine
                  </h3>

                  <p className="text-gray-600 text-sm mt-2 leading-relaxed">
                    Every month, fair and transparent draws are conducted so every player has an equal chance to win.
                  </p>
                </div>

              </div>

            </div>

            {/* CARD 1 */}
            <div className="rounded-2xl p-5 bg-white border shadow-sm hover:shadow-md hover:-translate-y-1 transition">

              <div className="p-2 w-fit rounded-lg bg-rose-50 text-rose-600">
                <Heart size={18} />
              </div>

              <h3 className="mt-3 font-semibold text-sm">
                Charity Impact
              </h3>

              <p className="text-xs text-gray-500 mt-1">
                Every game supports real causes.
              </p>

            </div>

            {/* CARD 2 */}
            <div className="rounded-2xl p-5 bg-white border shadow-sm hover:shadow-md hover:-translate-y-1 transition">

              <div className="p-2 w-fit rounded-lg bg-blue-50 text-blue-600">
                <BarChart3 size={18} />
              </div>

              <h3 className="mt-3 font-semibold text-sm">
                Performance Tracking
              </h3>

              <p className="text-xs text-gray-500 mt-1">
                Track last 5 rounds easily.
              </p>

            </div>

            {/* STATS CARD */}
            <div className="col-span-2 rounded-3xl p-6 bg-emerald-600 text-white shadow-md hover:shadow-xl transition">

              <div className="flex items-center justify-between">

                <div>
                  <div className="text-2xl font-bold">
                    ₹15.8L+
                  </div>

                  <p className="text-sm text-emerald-100 mt-1">
                    Total winnings distributed transparently
                  </p>
                </div>

                <div className="p-3 bg-white/10 rounded-xl">
                  <Sparkles size={22} />
                </div>

              </div>

            </div>

          </div>

        </div>

      </section>

      {/* IMPACT SECTION (story + stats) */}
      <section className="bg-emerald-600 text-white py-20">
        <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-12">

          <div>
            <h2 className="text-3xl font-bold">Real world impact</h2>
            <p className="mt-4 text-emerald-100">
              Every subscription directly supports verified charities while keeping competition fair.
            </p>
          </div>

          <div className="grid grid-cols-3 text-center">
            <div>
              <div className="text-3xl font-bold">₹5.2L</div>
              <div className="text-sm text-emerald-100">Donated</div>
            </div>
            <div>
              <div className="text-3xl font-bold">1,247</div>
              <div className="text-sm text-emerald-100">Players</div>
            </div>
            <div>
              <div className="text-3xl font-bold">₹15.8L</div>
              <div className="text-sm text-emerald-100">Winnings</div>
            </div>
          </div>

        </div>
      </section>

      {/* FINAL CTA (focus block) */}
      <section className="py-24 text-center">
        <h2 className="text-4xl font-bold">Ready to start your journey?</h2>
        <p className="text-gray-500 mt-4">Join golfers already making an impact.</p>

        <Link
          to="/register"
          className="mt-8 inline-block px-10 py-4 bg-emerald-600 text-white rounded-xl hover:bg-emerald-700 transition"
        >
          Join Now
        </Link>
      </section>

    </div>
  )
}

export default Home