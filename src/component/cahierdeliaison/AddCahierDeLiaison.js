import React, { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom'
import { useAuth } from '../user/AuthProvider'
import axios from 'axios'
import './AddCahierDeLiaison.css'

const AddCahierDeLiaison = () => {
  const location = useLocation()
  const {name} = location.state || {}
  const {user, userId, role, userName} = useAuth()
  const navigate = useNavigate()
  const {studentId, classroomId} =  useParams()
  const [cahierDeLiaisonDTO, setCahierDeLiaisonDTO] = useState({
    teacherId:userId,
    studentId:studentId,
    teacherName:userName,
    title:'',
    content:'',
    local_date_time:'',
    modified_at:null,
  })

  useEffect(() => {
    if (! user) {
      navigate('/connexion')
    }
  }, [user, navigate])

  const handleInputChange = (e) => {
    const {name, value} =  e.target
    setCahierDeLiaisonDTO({...cahierDeLiaisonDTO, [name] : value})
  }

  const handleSubmit =  async (e) => {
    e.preventDefault()
    const currentDateTime =  new Date().toLocaleString('fr-FR')
    const addCahierDeLiaisonDateTime = {...cahierDeLiaisonDTO, local_date_time : currentDateTime}
    try{
      const response = await axios.post(`http://localhost:8080/cahierDeLiaison/${studentId}`, addCahierDeLiaisonDateTime, {
        headers: {
          'Content-Type': 'application/json'
    },
    withCredentials : true 
       }) 
    
       navigate(`/list-cahiers-liaison/${studentId}`, {state:{name}})
    } catch (error){
      console.error('Error:', error)
    }
    }
  
  return (
    <div className='add-cahier-de-liaison'>
      <h2 className='add-cahier-de-liaison-title'>Cahier de Liaison</h2>

      {role === ('ADMIN' || 'SUPER_ADMIN') && (
        <form onSubmit={handleSubmit} method='post' className='add-cahier-de-liaison-form'>
          <div className='add-cahier-de-liaison-input-container'>
            <label htmlFor='title' className='add-cahier-de-liaison-label'>Titre</label>
            <input
              placeholder="Titre"
              type="text"
              name='title'
              id='title'
              onChange={handleInputChange}
              value={cahierDeLiaisonDTO.title}
              required
              maxLength='50'
              className='add-cahier-de-liaison-input'
            />
          </div>

          <div className='add-cahier-de-liaison-input-container'>
            <label htmlFor='content' className='add-cahier-de-liaison-label'>Contenu</label>
            <textarea
              placeholder="Votre Texte Ici"
              name='content'
              id='content'
              onChange={handleInputChange}
              value={cahierDeLiaisonDTO.content}
              required
              className='add-cahier-de-liaison-textarea'
            ></textarea>
          </div>

          <div className='add-cahier-de-liaison-button-container'>
            <button type='submit' className='add-cahier-de-liaison-submit-button'>Ok</button>
          </div>
        </form>
      )}
      
      <div className='add-cahier-de-liaison-button-container'>
        <button type='button' className='add-cahier-de-liaison-view-button'>
          <Link to={`/list-cahiers-liaison/${studentId}`} state={{ name }} style={{ textDecoration: 'none', color: 'inherit' }}>
            Voir les cahiers de liaison
          </Link>
        </button>
      </div>
    </div>
  )
}

export default AddCahierDeLiaison