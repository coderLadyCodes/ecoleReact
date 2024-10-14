import React, { useEffect, useState } from 'react'
import { useAuth } from '../user/AuthProvider'
import axios from 'axios'
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom'
import './RegularUpdatesList.css'

const RegularUpdatesList = () => {
  const { role } = useAuth()
  const {studentId} = useParams()
  const navigate = useNavigate()
  const location = useLocation()
  const {name} = location.state || {}
  const [regularUpdatesDTO, setRegularUpdatesDTO] = useState([])

  useEffect(() =>{
    loadRegularUpdatesList()
  }, [studentId])

  const loadRegularUpdatesList = async () => {

    try {
      const response = await axios.get(`http://localhost:8080/updates/regular/${studentId}`,{withCredentials: true})
      setRegularUpdatesDTO(response.data)
    } catch(error){
      console.error('error : ', error)
    }
  }

  return (
    <section className="regular-updates-list">
      <h2 className="regular-updates-list-title">Les Informations récurrentes pour : {name}</h2>

      {regularUpdatesDTO.map((regularUpdates) => (
        <div
          key={regularUpdates.id}
          className="regular-updates-list-item"
          onClick={role === 'PARENT' ? () => navigate(`/show-regular-updates/${studentId}/${regularUpdates.id}`, { state: { name } }) : null}
        >
          <p><strong>Enfant:</strong> {name}</p>
          <p><strong>Date:</strong> {regularUpdates.local_date}</p>
          <p><strong>Fait le:</strong> {regularUpdates.local_date_time}</p>
          {regularUpdates.modified_at && <p><strong>Modifié le:</strong> {regularUpdates.modified_at}</p>}
          <p><strong>Absence:</strong> {regularUpdates.isAbsent ? 'Absent(e)' : 'Présent(e)'}</p>
          <p><strong>Cantine:</strong> {regularUpdates.hasCantine ? 'Cantine' : 'Pas Cantine'}</p>
          <p><strong>Garderie:</strong> {regularUpdates.garderie}</p>
        </div>
      ))}

      {role === 'PARENT' && (
        <button type="button" className="regular-updates-list-btn">
          <Link to={`/regular-updates/${studentId}`} state={{ name }}>Retour</Link>
        </button>
      )}
    </section>
  )
}

export default RegularUpdatesList