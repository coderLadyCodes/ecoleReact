import React, { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom'
import { useAuth } from '../user/AuthProvider'
import axios from 'axios'

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
    <>
    <h2>Cahier de Liaison</h2>
    <button type='button'>
      <Link to={`/list-cahiers-liaison/${studentId}`} state={{name}}>Voir les cahiers de liaison</Link>
    </button>
    
    { role === ('ADMIN' || 'SUPER_ADMIN') && (
      
      <form onSubmit={handleSubmit} method='post'>
        <div>
        <label htmlFor='title'>Titre</label>
          <input placeholder="Titre" type="text" name='title' id='title' onChange={handleInputChange} value={cahierDeLiaisonDTO.title} required/>
        </div>

        <div>
        <label htmlFor='content'>Contenu</label>
          <textarea placeholder="Votre Texte Ici" type="text" name='content' id='content' onChange={handleInputChange} value={cahierDeLiaisonDTO.content} required></textarea>
        </div>

        <div>
         <button type='submit'>Ok</button>
      </div>
      {/*<div>
          <Link to={`/classroom/${classroomId}/student/${studentId}`}  type='button'>Annuler</Link>
      </div>*/}
      </form>
    )}
  </>)
}

export default AddCahierDeLiaison