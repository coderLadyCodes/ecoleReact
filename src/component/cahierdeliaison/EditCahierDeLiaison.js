import React, { useEffect, useState } from 'react'
import { useAuth } from '../user/AuthProvider'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'
import './EditCahierDeLiaison.css'

const EditCahierDeLiaison = () => {
    const {user, userId, userName, role} = useAuth()
    const navigate = useNavigate()
    const location = useLocation()
    const {name} = location.state || {}
    const {studentId, id} = useParams()
    const [cahierDeLiaisonDetails, setCahierDeLiaisonDetails] = useState({
        teacherId:userId,
        studentId:studentId,
        teacherName:userName,
        title:'',
        content:'',
        local_date_time:'',
        modified_at:'',
      })

      useEffect(() => {
        if(!user){
            navigate('/connexion')
        }

        loadCahierDeLiaisonEdit()

      }, [userId, studentId, id])

      const loadCahierDeLiaisonEdit = async (e) =>{
       
        try{
            const result = await axios.get(`${process.env.REACT_APP_API_URL}/cahierDeLiaison/${id}`, { withCredentials: true })
            setCahierDeLiaisonDetails(result.data)
        }catch (error) {
            console.error('Error loading cahierDeLiaison details:', error)
      }
    }

      const handleInputChange = (e) =>{
        const {name, value} = e.target
        setCahierDeLiaisonDetails({... cahierDeLiaisonDetails, [name] : value})
      }

      const updateCahierDeLiaison = async (e) =>{
        e.preventDefault()
        const modifiedDate = new Date().toLocaleString('fr-FR') 
        const updatedDate = {... cahierDeLiaisonDetails, modified_at: modifiedDate}
        try{
            const response = await axios.put(`${process.env.REACT_APP_API_URL}/cahierDeLiaison/update/${id}`, updatedDate,{
                headers: {
                    'Content-Type': 'application/json',
                  }, withCredentials: true   
            })
            setCahierDeLiaisonDetails(response.data)
            navigate(`/list-cahiers-liaison/${studentId}`, {state:{name}})
        }catch(error){
            console.error('Error:', error)
          }
      }
  
  return (
    <div className='edit-cahier-de-liaison'>
      <h2 className='edit-cahier-de-liaison-title'>Cahier de Liaison</h2>
      {role === ('ADMIN' || 'SUPER_ADMIN') && (
        <form className='edit-cahier-de-liaison-form' onSubmit={updateCahierDeLiaison}>
          <div className='edit-cahier-de-liaison-field'>
            <label htmlFor='title' className='edit-cahier-de-liaison-label'>Titre</label>
            <input
              className='edit-cahier-de-liaison-input'
              placeholder='Titre'
              type='text'
              name='title'
              id='title'
              maxLength='50'
              onChange={handleInputChange}
              value={cahierDeLiaisonDetails.title}
              required
            />
          </div>

          <div className='edit-cahier-de-liaison-field'>
            <label htmlFor='content' className='edit-cahier-de-liaison-label'>Contenu</label>
            <textarea
              className='edit-cahier-de-liaison-textarea'
              placeholder='Votre Texte Ici'
              name='content'
              id='content'
              onChange={handleInputChange}
              value={cahierDeLiaisonDetails.content}
              required
            ></textarea>
          </div>

          <div className='edit-cahier-de-liaison-actions'>
            <button className='edit-cahier-de-liaison-button' type='submit'>Sauvegarder</button>
          </div>
        </form>
      )}
    </div>
  )
}

export default EditCahierDeLiaison