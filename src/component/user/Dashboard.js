import React, { useEffect, useState } from 'react'

import { Link} from 'react-router-dom'
import axios from 'axios'
import profil from '../../images/profil.jpg'
import { useAuth } from './AuthProvider'
import './Dashboard.css'


const Dashboard = () => {
  const {logout, user, role, userId} = useAuth()
 const [showInfo, setShowInfo] = useState(false)
  const [userDTO, setUserDTO] = useState({
    name:'',
    email:'',
    phone:'',
    multipartFile:'',
  })

  {/*const toggleInfo = () => {
    setShowInfo(!showInfo)
  }*/}
  
  const handleLogout = async () => {
    try{
      let userChoise = window.confirm('Voulez-vous vous déconnecter ?')
      if(userChoise){
        await logout()
      }
    } catch (error) {
      console.error("Logout failed:", error)
    }  
  }

  useEffect(() => {

    const fetchData = async () => {
      try{
        const response = await axios.get(`http://localhost:8080/users/${userId}`)
        setUserDTO(response.data)
      }catch (error) {
        console.log('Error: ', error)
      }
    }
    fetchData()
  }, [userId])

  return (
    <section className='dashboard-container'>

      <div className='dashboard-profile-image' > {/*onClick={toggleInfo}*/}
        {userDTO.profileImage ? (
          <img
            src={`http://localhost:8080/images/${userDTO.id}/${userDTO.profileImage}`}
            alt='profil image'
          />
        ) : (
          <img src={profil} alt='default profile' />
        )}
      </div>

      {/*{showInfo && (*/}
        <div className='dashboard-info-container'>

          <div className='dashboard-info'>
            <h5>Nom et Prénom</h5>
            <p>{userDTO.name}</p>
          </div>

          <div className='dashboard-info'>
            <h5>Email</h5>
            <p>{userDTO.email}</p>
          </div>

          <div className='dashboard-info'>
            <h5>Numéro de téléphone</h5>
            <p>{userDTO.phone}</p>
          </div>

          <div className='dashboard-actions'>
            <button onClick={handleLogout} className='dashboard-button'>
              Deconnexion
            </button>

            <Link to='/edit-user' className='dashboard-link'>
              Modifier profil
            </Link>
            {/*
            <Link to='/add-student' className='dashboard-link'>
              Ajouter un Enfant
            </Link>
            */}
            {role !== 'PARENT' && (
              <Link to='/acces' className='dashboard-link'>
                Créer une classe
              </Link>
            )}
          </div>
        </div>
      {/*)}*/}
    </section>
  )
}

export default Dashboard