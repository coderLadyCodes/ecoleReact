import axios from 'axios'
import React, { useEffect, useState } from 'react'
import {FaEdit, FaEye, FaTrashAlt} from 'react-icons/fa'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { useAuth } from '../user/AuthProvider'

const ShowRegularUpdates = () => {
  const {user, role, userId} = useAuth()
  const navigate = useNavigate()
  const {studentId, ruId} = useParams()
  const [regularUpdatesDTO, setRegularUpdatesDTO] = useState({
    studentId:studentId,
    userId:userId,
    local_date_time:'', 
    modified_at:'',
    local_date:null, 
    isAbsent:'', 
    hasCantine:'', 
    garderie:'', 
  })

  useEffect(() => {
    if (ruId) {
      loadRegularUpdates()
    }
  }, [ruId])
  const loadRegularUpdates = async () => {
    try{
      const response = await axios.get(`http://localhost:8080/updates/${ruId}`, {withCredentials: true})
      
      setRegularUpdatesDTO(response.data)

    }catch (error) {
      console.error('Error: ', error)
    }
  }
  if (!user) {
    navigate('/connexion')
    return <p>Vous devez etre connecter a votre compte</p>
  }
  const handleDelete = async (id) =>{
    let superAdminChoice = window.confirm('Etes vous sure de supprimer ce UPDATE?')
    if (superAdminChoice){
      try{
         await axios.delete(`http://localhost:8080/updates/${id}`,{withCredentials: true})
         loadRegularUpdates()
      } catch(error){
        console.error('error deleting the UPDATE : ', error)
      }
    }
  }

  return (
    <section>
  <div>
  <h5>Absence</h5>
  </div>
  <div>
   <p>{regularUpdatesDTO.isAbsent?  'Absent(e)' : 'Présent(e)'}</p>
  </div>


  <div>
  <div>
  <h5>Cantine</h5>
  </div>
  <div>
   <p>{regularUpdatesDTO.hasCantine? 'Cantine' : 'Pas Cantine'}</p>
  </div>
  </div>

  <div>
  <h5>Garderie</h5>
  </div>
  <div>
   <p>{regularUpdatesDTO.garderie}</p>
  </div>

  <div>
  <h5>Date</h5>
  </div>
  <div>
   <p>{regularUpdatesDTO.local_date}</p>
  </div>


  <div>
  <h5>Date et Heure :</h5>
  </div>
  <div>

   <p>crée le :{regularUpdatesDTO.local_date_time}</p>

   <p>modifié le:{regularUpdatesDTO.modified_at}</p>

  </div>

   <button type='button'>
    <Link to={`/regular-updates/${regularUpdatesDTO.studentId}/${regularUpdatesDTO.id}`}><FaEdit />Modifier</Link>                                       
  </button>
  { role == 'SUPER_ADMIN' && (
     <button type='button'>
     <Link to={'/students-view'}>annuler</Link>  
     <button onClick={()=> handleDelete(regularUpdatesDTO.id)}><FaTrashAlt /></button>                                
   </button>
  )}

  { role == 'PARENT' && (
    <button type='button'>
    <Link to={`/show-list-updates/${regularUpdatesDTO.studentId}`}>Retour</Link>                               
  </button>
  )}
  </section>
  )
}

export default ShowRegularUpdates