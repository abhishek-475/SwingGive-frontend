import React, { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { FiMenu, FiX } from 'react-icons/fi'

const Navbar = () => {
  const { user, logout } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const [isOpen, setIsOpen] = useState(false)

  const handleLogout = () => {
    logout()
    navigate('/')
    setIsOpen(false)
  }

  const isActive = (path) => location.pathname === path

  const linkClass = (path) =>
    `relative text-sm font-medium transition ${isActive(path)
      ? "text-emerald-600"
      : "text-gray-700 hover:text-emerald-600"
    }`

  return (
    <nav className="sticky top-0 z-50 backdrop-blur-xl bg-white/80 border-b border-gray-100">

      <div className="max-w-7xl mx-auto px-6">

        <div className="flex justify-between items-center h-16">

          {/* LOGO */}
          <Link
            to="/"
            className="text-2xl font-bold tracking-tight text-gray-900"
          >
            Swing<span className="text-emerald-600">Give</span>
          </Link>

          {/* DESKTOP MENU */}
          <div className="hidden md:flex items-center gap-8">

            <Link to="/charities" className={linkClass("/charities")}>
              Charities
            </Link>

            <Link to="/draws" className={linkClass("/draws")}>
              Draws
            </Link>

            <Link to="/how-it-works" className={linkClass("/how-it-works")}>
              How It Works
            </Link>

            <Link to="/winners" className={linkClass("/winners")}>
              Winners
            </Link>

            {/* AUTH */}
            {user ? (
              <div className="flex items-center gap-4 ml-4">

                {/* Show Dashboard ONLY for normal users */}
                {user.role !== "admin" && (
                  <Link
                    to="/dashboard"
                    className="text-sm text-gray-700 hover:text-emerald-600"
                  >
                    Dashboard
                  </Link>
                )}

                {/* Show Admin ONLY for admin */}
                {user.role === "admin" && (
                  <Link
                    to="/admin"
                    className="text-sm text-emerald-600 font-medium"
                  >
                    Admin
                  </Link>
                )}

                <button
                  onClick={handleLogout}
                  className="text-sm text-red-500 hover:text-red-600"
                >
                  Logout
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-3 ml-4">

                <Link
                  to="/login"
                  className="text-sm text-gray-700 hover:text-emerald-600"
                >
                  Login
                </Link>

                <Link
                  to="/register"
                  className="px-4 py-2 bg-emerald-600 text-white text-sm rounded-lg hover:bg-emerald-700 shadow-sm transition"
                >
                  Join Now
                </Link>

              </div>
            )}

          </div>

          {/* MOBILE BUTTON */}
          <button
            className="md:hidden text-gray-700"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <FiX size={22} /> : <FiMenu size={22} />}
          </button>

        </div>

        {/* MOBILE MENU */}
        {isOpen && (
          <div className="md:hidden pb-6">

            <div className="mt-3 bg-white border rounded-xl shadow-sm p-4 space-y-3">

              {[
                ["Charities", "/charities"],
                ["Draws", "/draws"],
                ["How It Works", "/how-it-works"],
                ["Winners", "/winners"]
              ].map(([name, path], i) => (
                <Link
                  key={i}
                  to={path}
                  onClick={() => setIsOpen(false)}
                  className="block text-gray-700 hover:text-emerald-600 text-sm"
                >
                  {name}
                </Link>
              ))}

              <div className="border-t pt-3 space-y-2">

                {user ? (
                  <>
                    {/* ONLY normal users */}
                    {user.role !== "admin" && (
                      <Link
                        to="/dashboard"
                        onClick={() => setIsOpen(false)}
                        className="block text-sm text-gray-700"
                      >
                        Dashboard
                      </Link>
                    )}

                    {/* ONLY admin */}
                    {user.role === "admin" && (
                      <Link
                        to="/admin"
                        onClick={() => setIsOpen(false)}
                        className="block text-sm text-emerald-600"
                      >
                        Admin
                      </Link>
                    )}

                    <button
                      onClick={handleLogout}
                      className="text-sm text-red-500 w-full text-left"
                    >
                      Logout
                    </button>
                  </>
                ) : (
                  <>
                    <Link
                      to="/login"
                      onClick={() => setIsOpen(false)}
                      className="block text-sm"
                    >
                      Login
                    </Link>

                    <Link
                      to="/register"
                      onClick={() => setIsOpen(false)}
                      className="block bg-emerald-600 text-white text-center py-2 rounded-lg text-sm"
                    >
                      Join Now
                    </Link>
                  </>
                )}

              </div>

            </div>

          </div>
        )}

      </div>
    </nav>
  )
}

export default Navbar