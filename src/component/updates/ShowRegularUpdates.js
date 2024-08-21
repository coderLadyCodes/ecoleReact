import axios from 'axios'
import React, { useEffect, useState } from 'react'
import {FaEdit, FaEye, FaTrashAlt} from 'react-icons/fa'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { useAuth } from '../user/AuthProvider'

const ShowRegularUpdates = () => {
  const {user, role} = useAuth()
  const navigate = useNavigate()
  const {studentId, ruId} = useParams()
  const [regularUpdatesDTO, setRegularUpdatesDTO] = useState({
    studentId:'',
    userId:'',
    local_date_time:'', 
    local_date:null, 
    isAbsent:'', 
    hasCantine:'', 
    garderie:'', 
  })

  useEffect(() => {
    loadRegularUpdates()
  }, [studentId, ruId])
  const loadRegularUpdates = async () => {
    try{
      const response = await axios.get(`http://localhost:8080/updates/${ruId}`, {withCredentials: true}) //`http://localhost:8080/updates/${id}`
      
      setRegularUpdatesDTO(response.data)

    }catch (error) {
      console.error('Error: ', error)
    }
  }
  if (!user) {
    navigate('/connexion')
    return <p>Vous devez etre connecter a votre compte</p>
  }
  return (
    <section>
    <h2>Enfant : </h2>
  <div>
  <h5>Présence</h5>
  </div>
  <div>
   <p>{regularUpdatesDTO.isAbsent.toString()}</p>
  </div>


  <div>
  <div>
  <h5>Cantine</h5>
  </div>
  <div>
   <p>{regularUpdatesDTO.hasCantine.toString()}</p>
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
   <p>{regularUpdatesDTO.local_date_time}</p>
  </div>

   <button type="button">
    <Link to={`/edit-student/${regularUpdatesDTO.ruId}`}><FaEdit />Modifier</Link>                                       
  </button>
  { role == 'SUPER_ADMIN' && (
     <button type="button">
     <Link to={'/students-view'}>annuler</Link>                                  
   </button>
  )}

  { role == 'PARENT' && (
    <button type="button">
    <Link to={`/student-profile/${studentId}`}>Retour</Link>                               
  </button>
  )}
  
  </section>
  )
}

export default ShowRegularUpdates