import React from 'react'
import { useAuth } from './AuthProvider'
import { useNavigate } from 'react-router-dom'

const Dashboard = () => {
  const navigate = useNavigate()
  const {logout, userName, user, role} = useAuth()
 
  const handleLogout = async () => {
    try{
      await logout()
    // navigate('/') 
    } catch (error) {
      console.error("Logout failed:", error)
    }  
  }
  return (
    <div>
      <h1>Bienvenue "Nom d'utilisateur": {userName}</h1>
      <h1>Bienvenue "Email": {user}</h1>
      <h1>Bienvenue "Role" : {role}</h1>
      <button onClick={handleLogout}>Deconnexion</button>
    </div>
  )
}

export default Dashboard