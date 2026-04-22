import React from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import LoadingSpinner from './LoadingSpinner'

const PrivateRoute = ({ children, adminOnly = false }) => {
  const { user, loading, token } = useAuth()
  const location = useLocation()

  //  Show loader while auth is initializing
  if (loading) {
  return <LoadingSpinner />
}
  if (!token) {
  return <Navigate to="/login" state={{ from: location }} replace />
}

if (!user) {
  return <LoadingSpinner />
}

  return children
}

export default PrivateRoute