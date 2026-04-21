import React from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import LoadingSpinner from './LoadingSpinner'

const PrivateRoute = ({ children, adminOnly = false }) => {
  const { user, loading, token } = useAuth()
  const location = useLocation()

  // ✅ 1. Show loader while auth is initializing
  if (loading || !token) {
    return <LoadingSpinner />
  }

  // ✅ 2. If not logged in → redirect to login
  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />
  }

  // ✅ 3. Admin protection
  if (adminOnly && user?.role !== 'admin') {
    return <Navigate to="/dashboard" replace />
  }

  return children
}

export default PrivateRoute