import React from 'react'
import { useAuth } from './AuthProvider'
import { Navigate, Outlet } from 'react-router-dom'

const PrivateRoute = () => {
    const user = useAuth()

    if (!user.token) return <Navigate to="/connexion" />

  return 
     <Outlet />    
}

export default PrivateRoute