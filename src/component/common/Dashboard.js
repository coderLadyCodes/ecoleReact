import React, { useEffect, useState } from 'react'
import { useAuth } from './AuthProvider'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import profil from '../../images/profil.jpg'
import cahierdeliaison from '../../images/cahierdeliaison.png'
import discussion from '../../images/discussion.png'

const Dashboard = () => {

  const {logout, user, role, userId} = useAuth()

  const [userDTO, setUserDTO] = useState({
    name:'',
    email:'',
    phone:'',
    multipartFile:'',
  })
  
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
    // ***********************CONFIGURER TOUT CA DANS LE COIN A DROITE ' MON COMPTE ' AVEC L'IMAGE DE PROFIL***************************
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

    <section>
      {user && <p>** Bienvenue, Email: {user}, Role: {role} **</p>}
      
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
      <button onClick={handleLogout}>Deconnexion</button> 
      <Link to={'/cahier-de-liaison'}><img src={cahierdeliaison} alt="cahier de liaison" style={{width: 120, height: 120}}/></Link>
      <Link to={'/discussion'}><img src={discussion} alt="discussion" style={{width: 140, height: 120}}/></Link>

      <button><Link to={'/edit-user'}>Modifier profile</Link></button> 
      <button><Link to={'/add-student'}>Ajouter un Enfant</Link></button> 
      <button><Link to={'/accueil'}>Retour à la Page d'Accueil</Link></button> 
      <button><Link to={'/kids-parent'}>Voir les profils des enfants</Link></button> 
    </section>
  )
}

export default Dashboard