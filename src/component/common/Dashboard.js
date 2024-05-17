import React from 'react'
import { useAuth } from './AuthProvider'
import { useNavigate } from 'react-router-dom'

const Dashboard = () => {
  const navigate = useNavigate()
  const auth = useAuth()

  const handleLogout = () => {
    auth.logout()
    navigate('/')
  }
  return (
    <div>
      <h1>Bienvenue {auth.user?.username}</h1>
      <button onClick={handleLogout}>Deconnexion</button>
    </div>
  )
}

export default Dashboard