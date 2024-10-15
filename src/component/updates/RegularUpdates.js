import axios from 'axios'
import React, { useEffect, useState } from 'react'
import DatePicker from 'react-datepicker'
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom'
import { useAuth } from '../user/AuthProvider'
import ReactDatePicker from 'react-datepicker'
import './RegularUpdates.css'

const RegularUpdates = () => {
  const {user, userId} = useAuth()
  const {role} = useAuth()
  const navigate = useNavigate()
  const {studentId} = useParams()
  const location = useLocation()
  const {name} = location.state || {}

  const tomorrow = new Date()
  tomorrow.setDate(tomorrow.getDate() + 1)

  const formatedDate = tomorrow.toLocaleDateString('fr-FR')

  const [regularUpdatesDTO, setRegularUpdatesDTO] = useState({
      studentId:studentId,
      userId:'',
      student_name:name || '',
      local_date_time:'',
      modified_at:null,
      local_date:formatedDate, 
      isAbsent:'', 
      hasCantine:'', 
      garderie:'PAS_DE_GARDERIE', 
    })

    useEffect(() => {
      if (!user) {
        navigate('/connexion')
      }
    }, [user, navigate])

    const handleInputChange = (e) => {
    const {name, value, type} = e.target
    const newValue = type === 'radio' ? (value === 'true') : value
    setRegularUpdatesDTO({... regularUpdatesDTO, [name]: newValue})
 }

 {/*const handleDayChange = (date) => { 
  setRegularUpdatesDTO({ ...regularUpdatesDTO, local_date: date })
}*/}

    const handleSubmit = async (e) => {
      e.preventDefault()
      const currentDateTime =  new Date().toLocaleString('fr-FR')
      //const formatedDate = regularUpdatesDTO.local_date.toLocaleDateString('fr-FR')
      const createdRegularUpdates = {...regularUpdatesDTO,local_date_time: currentDateTime, local_date: formatedDate}
      try{
        const response = await axios.post(`${process.env.REACT_APP_API_URL}/updates/${studentId}`, createdRegularUpdates,{
      headers: {
              'Content-Type': 'application/json'
    },
    withCredentials : true
    })
 
   navigate(`/show-list-updates/${studentId}`, { state:{name}})

      }catch (error) {
        if (error.response && error.response.status === 409) {
          alert('Les infos ont été mis à jour pour ce jour ci.')
        } else {
          console.error('Error:', error)
        }
      }
    }
 
 const formValid = regularUpdatesDTO.isAbsent !== '' && regularUpdatesDTO.hasCantine !== '' && regularUpdatesDTO.garderie !== '' &&  regularUpdatesDTO.local_date !== ''
  return (
    <div className="regular-updates">
      <h2 className="regular-updates-title">Absence, Cantine, Garderie pour : {name}, Date : {formatedDate}</h2>

      <div className="regular-updates-actions">
        <button type="button" className="regular-updates-btn">
          <Link to={`/show-list-updates/${studentId}`} state={{ name }}>Voir les précédents Absences / cantine / garderie</Link>
        </button>
      </div>

      <form className="regular-updates-form" onSubmit={handleSubmit}>
        <div className="regular-updates-field">
          <label htmlFor="local_date" className="regular-updates-label">Date :</label>
          <input
            className="regular-updates-input"
            type="text"
            id="local_date"
            value={regularUpdatesDTO.local_date}
            readOnly
          />
        </div>

        <fieldset className="regular-updates-fieldset">
          <legend className="regular-updates-legend">Absence</legend>
          <div className="regular-updates-field-radio">
            <input type="radio" name="isAbsent" id="isAbsent-true" value="true" checked={regularUpdatesDTO.isAbsent === true} onChange={handleInputChange} required />
            <label htmlFor="isAbsent-true" className="regular-updates-radio-label">Absent</label>

            <input type="radio" name="isAbsent" id="isAbsent-false" value="false" checked={regularUpdatesDTO.isAbsent === false} onChange={handleInputChange} required />
            <label htmlFor="isAbsent-false" className="regular-updates-radio-label">Present</label>
          </div>
        </fieldset>

        <fieldset className="regular-updates-fieldset">
          <legend className="regular-updates-legend">Cantine</legend>
          <div className="regular-updates-field-radio">
            <input type="radio" name="hasCantine" id="hasCantine-true" value="true" checked={regularUpdatesDTO.hasCantine === true} onChange={handleInputChange} required />
            <label htmlFor="hasCantine-true" className="regular-updates-radio-label">Oui</label>

            <input type="radio" name="hasCantine" id="hasCantine-false" value="false" checked={regularUpdatesDTO.hasCantine === false} onChange={handleInputChange} required />
            <label htmlFor="hasCantine-false" className="regular-updates-radio-label">Non</label>
          </div>
        </fieldset>

        <div className="regular-updates-field">
          <label htmlFor="garderie" className="regular-updates-label">Garderie</label>
          <select name="garderie" id="garderie" className="regular-updates-select" value={regularUpdatesDTO.garderie} onChange={handleInputChange} required>
            <option value="PAS_DE_GARDERIE">Pas de garderie</option>
            <option value="MATIN">Matin</option>
            <option value="SOIR">Soir</option>
            <option value="MATIN_ET_SOIR">Matin et Soir</option>
          </select>
        </div>

        <div className="regular-updates-actions">
          <button className="regular-updates-submit-btn" type="submit" disabled={!formValid}>Ok</button>
          {role === 'PARENT' && (
            <button type="button" className="regular-updates-btn">
              <Link to={`/student-profile/${studentId}`}>Annuler</Link>
            </button>
          )}
        </div>
      </form>
    </div>
  )
}

export default RegularUpdates