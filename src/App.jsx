import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import { AuthProvider } from './context/AuthContext'

// Components
import Navbar from './components/Navbar'
import PrivateRoute from './components/ProtectedRoute'
import Footer from './components/Footer'


// Pages
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import Dashboard from './pages/Dashboard'
import Charities from './pages/Charities'
import Draws from './pages/Draws'
import Subscribe from './pages/Subscribe'
import Profile from './pages/Profile'
import Winners from './pages/Winners'
import HowItWorks from './pages/HowItWorks'

// Admin Pages
import AdminDashboard from './pages/admin/AdminDashboard'
import AdminUsers from './pages/admin/AdminUsers'
import AdminCharities from './pages/admin/AdminCharities'
import AdminDraws from './pages/admin/AdminDraws'
import AdminWinners from './pages/admin/AdminWinners'

function App() {
  return (
    <AuthProvider>
      <Navbar />
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
      <Footer />
        <Toaster
        position="top-right"
        toastOptions={{
          style: {
            background: "#0f172a", // dark slate
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