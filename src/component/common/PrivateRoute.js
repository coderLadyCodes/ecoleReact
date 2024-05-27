import React from 'react'
import { useAuth } from './AuthProvider'
import { Navigate, Outlet, Route } from 'react-router-dom'

const PrivateRoute = ({children}) => {
    const {user} = useAuth()
   return  user ? children :  <Navigate to="/connexion" replace/>
     //<Outlet />    
}

export default PrivateRoute