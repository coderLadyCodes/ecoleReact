import axios from 'axios'
import React, { useEffect, useState } from 'react'
import profil from '../../images/profil.jpg'
import { Link, useLocation, useParams } from 'react-router-dom'
import './UserProfile.css'

const UserProfile = () => {
  const location = useLocation()
  const {classroomId} = location.state || {}
    const {userId} = useParams()
    const [userDTO, setUserDTO] = useState({
        name:'',
        email:'',
        phone:'',
        multipartFile:'',    
    })

    useEffect(() => {
        const fetchData = async () => {
            try{
                const response = await axios.get(`http://localhost:8080/users/${userId}`, {withCredentials: true})
                setUserDTO(response.data)
            }catch (error) {
              console.error('Error fetching user data:', error)
              }
        }
        fetchData()
    }, [userId])
  return (
    <section className='user-profile'>
      <h2 className='user-profile-title'>Le profil de {userDTO.name}</h2>
      <div className='user-profile-image-container'>
        {userDTO.profileImage ? (
          <img
            src={`http://localhost:8080/images/${userDTO.id}/${userDTO.profileImage}`}
            alt='profil image'
            className='user-profile-image'
          />
        ) : (
          <img src={profil} alt='default profile' className='user-profile-image' />
        )}
      </div>

      <div className='user-profile-info'>
        <h5 className='user-profile-label'>Nom et Prénom</h5>
        <p className='user-profile-value'>{userDTO.name}</p>

        <h5 className='user-profile-label'>Email</h5>
        <p className='user-profile-value'>{userDTO.email}</p>

        <h5 className='user-profile-label'>Numéro de téléphone</h5>
        <p className='user-profile-value'>{userDTO.phone}</p>
      </div>

      {!classroomId && (
        <div className='user-profile-button-container'>
          <button className='user-profile-button'>
            <Link to={`/edit-user/${userId}`} className='user-profile-link'>Modifier profile</Link>
          </button>
          <button className='user-profile-button'>
            <Link to={'/users-view'} className='user-profile-link'>Annuler</Link>
          </button>
        </div>
      )}
    </section>
  )
}

export default UserProfile