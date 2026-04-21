import React, { Suspense, lazy } from 'react'
import { Routes, Route } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import { AuthProvider } from './context/AuthContext'

// Core Components (keep these non-lazy for UX stability)
import Navbar from './components/Navbar'
import PrivateRoute from './components/ProtectedRoute'
import Footer from './components/Footer'

// 🔥 Lazy Loaded Pages
const Home = lazy(() => import('./pages/Home'))
const Login = lazy(() => import('./pages/Login'))
const Register = lazy(() => import('./pages/Register'))
const Dashboard = lazy(() => import('./pages/Dashboard'))
const Charities = lazy(() => import('./pages/Charities'))
const Draws = lazy(() => import('./pages/Draws'))
const Subscribe = lazy(() => import('./pages/Subscribe'))
const Profile = lazy(() => import('./pages/Profile'))
const Winners = lazy(() => import('./pages/Winners'))
const HowItWorks = lazy(() => import('./pages/HowItWorks'))

// Admin Pages (also lazy)
const AdminDashboard = lazy(() => import('./pages/admin/AdminDashboard'))
const AdminUsers = lazy(() => import('./pages/admin/AdminUsers'))
const AdminCharities = lazy(() => import('./pages/admin/AdminCharities'))
const AdminDraws = lazy(() => import('./pages/admin/AdminDraws'))
const AdminWinners = lazy(() => import('./pages/admin/AdminWinners'))

// 🔥 Loading UI (important for smooth feel)
const PageLoader = () => (
  <div className="min-h-screen flex items-center justify-center">
    <div className="h-10 w-10 border-4 border-emerald-600 border-t-transparent rounded-full animate-spin"></div>
  </div>
)

function App() {
  return (
    <AuthProvider>
      <Navbar />

      {/* 🔥 Suspense wraps ALL lazy routes */}
      <Suspense fallback={<PageLoader />}>
        <Routes>

          {/* Public Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/charities" element={<Charities />} />
          <Route path="/draws" element={<Draws />} />
          <Route path="/how-it-works" element={<HowItWorks />} />
          <Route path="/winners" element={<Winners />} />

          {/* Protected User Routes */}
          <Route path="/dashboard" element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          } />

          <Route path="/subscribe" element={
            <PrivateRoute>
              <Subscribe />
            </PrivateRoute>
          } />

          <Route path="/profile" element={
            <PrivateRoute>
              <Profile />
            </PrivateRoute>
          } />

          {/* Admin Routes */}
          <Route path="/admin" element={
            <PrivateRoute adminOnly={true}>
              <AdminDashboard />
            </PrivateRoute>
          } />

          <Route path="/admin/users" element={
            <PrivateRoute adminOnly={true}>
              <AdminUsers />
            </PrivateRoute>
          } />

          <Route path="/admin/charities" element={
            <PrivateRoute adminOnly={true}>
              <AdminCharities />
            </PrivateRoute>
          } />

          <Route path="/admin/draws" element={
            <PrivateRoute adminOnly={true}>
              <AdminDraws />
            </PrivateRoute>
          } />

          <Route path="/admin/winners" element={
            <PrivateRoute adminOnly={true}>
              <AdminWinners />
            </PrivateRoute>
          } />

        </Routes>
      </Suspense>

      <Footer />

      <Toaster
        position="top-right"
        toastOptions={{
          style: {
            background: "#0f172a",
            color: "#fff",
            border: "1px solid #22c55e33",
            padding: "12px 14px",
            borderRadius: "10px",
            fontSize: "14px",
          },
          success: {
            iconTheme: {
              primary: "#22c55e",
              secondary: "#fff",
            },
          },
          error: {
            iconTheme: {
              primary: "#ef4444",
              secondary: "#fff",
            },
          },
        }}
      />
    </AuthProvider>
  )
}

export default App