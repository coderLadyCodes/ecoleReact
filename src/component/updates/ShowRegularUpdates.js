import axios from 'axios'
import React, { useEffect, useState } from 'react'
import {FaEdit, FaEye, FaTrashAlt} from 'react-icons/fa'
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom'
import { useAuth } from '../user/AuthProvider'
import './ShowRegularUpdates.css'

const ShowRegularUpdates = () => {
  const {user, role, userId} = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const {name} = location.state || {}
  const {studentId, ruId} = useParams()
  const [regularUpdatesDTO, setRegularUpdatesDTO] = useState({
    studentId:studentId,
    userId:userId,
    student_name:'',
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
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/updates/${ruId}`, {withCredentials: true})
      
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
         await axios.delete(`${process.env.REACT_APP_API_URL}/updates/${id}`,{withCredentials: true})
         loadRegularUpdates()
      } catch(error){
        console.error('error deleting the UPDATE : ', error)
      }
    }
  }

  return (
    <section className="show-regular-updates">
      <div className="show-regular-updates-section">
        <h5>Enfant</h5>
        <p>{name}</p>
      </div>

      <div className="show-regular-updates-section">
        <h5>Absence</h5>
        <p>{regularUpdatesDTO.isAbsent ? 'Absent(e)' : 'Présent(e)'}</p>
      </div>

      <div className="show-regular-updates-section">
        <h5>Cantine</h5>
        <p>{regularUpdatesDTO.hasCantine ? 'Cantine' : 'Pas Cantine'}</p>
      </div>

      <div className="show-regular-updates-section">
        <h5>Garderie</h5>
        <p>{regularUpdatesDTO.garderie}</p>
      </div>

      <div className="show-regular-updates-section">
        <h5>Date</h5>
        <p>{regularUpdatesDTO.local_date}</p>
      </div>

      <div className="show-regular-updates-section">
        <h5>Date et Heure :</h5>
        <p>Créé le : {regularUpdatesDTO.local_date_time}</p>
        <p>Modifié le : {regularUpdatesDTO.modified_at}</p>
      </div>

      <div className="show-regular-updates-actions">
        <button type="button">
          <Link to={`/regular-updates/${regularUpdatesDTO.studentId}/${regularUpdatesDTO.id}`}>
            <FaEdit /> Modifier
          </Link>
        </button>

        {role === 'SUPER_ADMIN' && (
          <div>
            <button type="button">
              <Link to="/students-view">Annuler</Link>
            </button>
            <button onClick={() => handleDelete(regularUpdatesDTO.id)}>
              <FaTrashAlt /> Supprimer
            </button>
          </div>
        )}

        {role === 'PARENT' && (
          <button type="button">
            <Link to={`/show-list-updates/${regularUpdatesDTO.studentId}`}>Retour</Link>
          </button>
        )}
      </div>
    </section>
  )
}

export default ShowRegularUpdates