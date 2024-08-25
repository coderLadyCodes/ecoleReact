import axios from 'axios'
import React, { useEffect, useState } from 'react'
import profil from '../../images/profil.jpg'
import { Link, useLocation, useParams } from 'react-router-dom'

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
    <section>
    <h2>Le profil de {userDTO.name}</h2>
    <div style={{width: '8rem'}}>
      {userDTO.profileImage?<img src={`http://localhost:8080/images/${userDTO.id}/${userDTO.profileImage}`}
      alt="profil image" 
      style={{width: 60, height: 60}}/> : <img src={profil} style={{width: 60, height: 60}}/> }   
    </div>

    <div>
      <h5>Nom et Prénom</h5>
    </div>
    <div>
      <p>{userDTO.name}</p>
    </div>
    <div>
      <h5>Email</h5>
    </div>
    <div>
       <p>{userDTO.email}</p>
    </div>
      
    <div>
      <h5> Numéro de télephone</h5>
    </div>

    <div>
      <p>{userDTO.phone}</p>
    </div>
    {!classroomId && (
      <div > 
    <button><Link to={`/edit-user/${userId}`}>Modifier profile</Link></button> 
    <button><Link to={'/users-view'}>Annuler</Link></button> 
    </div> )}
  </section>
  )
}

export default UserProfile