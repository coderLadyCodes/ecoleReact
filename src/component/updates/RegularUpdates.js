import axios from 'axios'
import React, { useState } from 'react'
import DatePicker from 'react-datepicker'
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom'
import { useAuth } from '../user/AuthProvider'
import ReactDatePicker from 'react-datepicker'

const RegularUpdates = () => {
  const {user} = useAuth()
  const {role} = useAuth()
  const navigate = useNavigate()
  const {studentId} = useParams()
  const location = useLocation()
  const {name} = location.state || {}
  const [regularUpdatesDTO, setRegularUpdatesDTO] = useState({
      studentId:'',
      userId:'',
      local_date_time:'',
      modified_at:null,
      local_date:new Date(), 
      isAbsent:'', 
      hasCantine:'', 
      garderie:'PAS_DE_GARDERIE', 
    })

    const handleInputChange = (e) => {
    const {name, value, type} = e.target
    const newValue = type === 'radio' ? (value === 'true') : value
    setRegularUpdatesDTO({... regularUpdatesDTO, [name]: newValue})
 }

 const handleDayChange = (date) => {
  setRegularUpdatesDTO({ ...regularUpdatesDTO, local_date: date })
}

    const handleSubmit = async (e) => {
      e.preventDefault()
      const currentDateTime =  new Date().toLocaleString('fr-FR')
      const formatedDate = regularUpdatesDTO.local_date.toLocaleDateString('fr-FR')
      const createdRegularUpdates = {...regularUpdatesDTO,local_date_time: currentDateTime, local_date: formatedDate}
      try{
        const response = await axios.post(`http://localhost:8080/updates/${studentId}`, createdRegularUpdates,{
      headers: {
              'Content-Type': 'application/json'
    },
    withCredentials : true
    })
    const ruId = response.data.id
   navigate(`/show-list-updates/${studentId}/${ruId}`)

      }catch (error) {
        console.error('Error:', error)
      }
    }
    if (!user) {
      navigate('/connexion')
      return <p>Vous devez etre connecter a votre compte</p>
    }
 const formValid = regularUpdatesDTO.isAbsent !== '' && regularUpdatesDTO.hasCantine !== '' && regularUpdatesDTO.garderie !== '' &&  regularUpdatesDTO.local_date !== ''
  return (
    <div>
      <h2> Absence, Cantine, Garderie pour : {name}</h2>
    <form onSubmit={handleSubmit}>
    <div>
      <label htmlFor="local_date" >Date :</label>
      <DatePicker id='local_date'  selected={regularUpdatesDTO.local_date} onChange={handleDayChange} dateFormat='dd/MM/yyyy'  showYearDropdown scrollableMonthYearDropdown required />
    </div>
    <fieldset>
              <legend>Absence</legend>
              <div>
                <div>
                  <input type='radio' name='isAbsent' id='isAbsent-true' value='true' checked={regularUpdatesDTO.isAbsent === true} onChange={handleInputChange} required/>
                  <label htmlFor='isAbsent-true'>
                    Absent
                  </label>
                </div>
                <div>
                  <input type='radio' name='isAbsent' id='isAbsent-false' value='false' checked={regularUpdatesDTO.isAbsent === false} onChange={handleInputChange} required/>
                  <label htmlFor='isAbsent-false'>
                    Present
                  </label>
                </div>
              </div>
            </fieldset>

            <fieldset>
              <legend>Cantine</legend>
              <div>
                <div>
                  <input type='radio' name='hasCantine' id='hasCantine-true' value='true' checked={regularUpdatesDTO.hasCantine === true} onChange={handleInputChange} required/>
                  <label  htmlFor='hasCantine-true'>
                    Oui
                  </label>
                </div>
                <div>
                  <input type='radio' name='hasCantine' id='hasCantine-false' value='false' checked={regularUpdatesDTO.hasCantine === false} onChange={handleInputChange} required/>
                  <label htmlFor='hasCantine-false'>
                    Non
                  </label>
                </div>
              </div>
            </fieldset>
        <label htmlFor='garderie'>Garderie</label>
        <select name='garderie' id='garderie' value={regularUpdatesDTO.garderie} onChange={handleInputChange} required>
          <option value='PAS_DE_GARDERIE'>Pas de garderie</option>
          <option value='MATIN'>Matin</option>
          <option value='SOIR'>Soir</option>
          <option value='MATIN_ET_SOIR'>Matin et Soir</option>
        </select>
        <button type='submit' disabled={!formValid}>Save</button>
        { role == 'PARENT' && (
    <button type="button">
    <Link to={`/student-profile/${studentId}`}>annuler</Link>                                
  </button>
  )}
    </form>
    </div>
  )
}

export default RegularUpdates