import React from 'react'
import { useNavigate, useParams } from 'react-router-dom'

const Dashboard = () => {
    const {userId} = useParams()
    let navigate = useNavigate()

    const handleLogout = () => {
        navigate('/')
    }
  return (
    <div>
        <h2>Bienvenue {userId} </h2>
        <button type='button' onClick={handleLogout}>Déconnexion</button>
    </div>
  )
}

export default Dashboard