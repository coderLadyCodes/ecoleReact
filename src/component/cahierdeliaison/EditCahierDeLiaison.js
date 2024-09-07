import React, { useEffect, useState } from 'react'
import { useAuth } from '../user/AuthProvider'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'

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
            const result = await axios.get(`http://localhost:8080/cahierDeLiaison/${id}`, { withCredentials: true })
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
            const response = await axios.put(`http://localhost:8080/cahierDeLiaison/update/${id}`, updatedDate,{
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
    <div>
    <h2>Cahier de Liaison</h2>
    { role == ('ADMIN' || 'SUPER_ADMIN') && (
      
      <form onSubmit={updateCahierDeLiaison}>
        <div>
        <label htmlFor='title'>Titre</label>
          <input placeholder="Titre" type="text" name='title' id='title' onChange={handleInputChange} value={cahierDeLiaisonDetails.title} required/>
        </div>

        <div>
        <label htmlFor='content'>Contenu</label>
          <textarea placeholder="Votre Texte Ici" type="text" name='content' id='content' onChange={handleInputChange} value={cahierDeLiaisonDetails.content} required></textarea>
        </div>

        <div>
         <button type='submit'>Ok</button>
      </div>
      <div>
          
      </div>
      </form>
    )}
  </div>
  )
}

export default EditCahierDeLiaison