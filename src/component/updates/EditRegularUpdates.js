import axios from 'axios'
import React, { useEffect, useState } from 'react'
import DatePicker from 'react-datepicker'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { useAuth } from '../user/AuthProvider'

const EditRegularUpdates = () => {
    const {role, user, userId} = useAuth()
    let navigate = useNavigate()
    const {ruId, studentId} = useParams()
    const [regularUpdatesDetails, setRegularUpdatesDetails] = useState({
        studentId:'',
        userId:'',
        local_date_time:'',
        modified_at:'',
        local_date:new Date(), 
        isAbsent:'', 
        hasCantine:'', 
        garderie:'PAS_DE_GARDERIE', 
      })

      useEffect(() => {
        loadRegularUpdate()
      }, [userId, studentId])
      
      const loadRegularUpdate = async () => {
      try{
      const result = await axios.get(`http://localhost:8080/updates/${ruId}`, { withCredentials: true })
      setRegularUpdatesDetails({...result.data, local_date: new Date()})
   } catch (error) {
      console.error('Error loading update details:', error)
    }
      }

      const handleInputChange = (e) =>{
        const { name, value, type } = e.target
        const newValue = e.target.type === 'radio' ? (value === 'true') : value
        setRegularUpdatesDetails({...regularUpdatesDetails, [name]: newValue})
      }

      const handleDateChange = (date) => {
        setRegularUpdatesDetails({...regularUpdatesDetails, local_date : date})
      }

      const updateRegularUpdate= async (e) =>{
        e.preventDefault()
        const formattedDate = regularUpdatesDetails.local_date.toLocaleDateString('fr-FR') 
        const modifiedDate = new Date().toLocaleString('fr-FR')
        const updatedUpdate = {...regularUpdatesDetails, local_date: formattedDate, modified_at: modifiedDate}

        try{
            const response = await axios.put(`http://localhost:8080/updates/${ruId}`, updatedUpdate, {
                headers: {
                    'Content-Type': 'application/json',
                  }, withCredentials: true
            })
            setRegularUpdatesDetails(response.data)
            navigate(`/show-list-updates/${studentId}`)
        } catch(error){
            console.error('Error:', error)
          }
      }
      if (!user) {
        navigate('/connexion')
        return <p>Vous devez etre connecter a votre compte</p>
      }

    const formValid = regularUpdatesDetails.isAbsent !== '' && regularUpdatesDetails.hasCantine !== '' && regularUpdatesDetails.garderie !== '' &&  regularUpdatesDetails.local_date !== ''
    return (
      <div>
        <h2> Absence, Cantine, Garderie</h2>
      <form onSubmit={updateRegularUpdate}>
      <div>
        <label htmlFor="local_date" >Date :</label>
        <DatePicker id='local_date'  selected={regularUpdatesDetails.local_date} onChange={handleDateChange} dateFormat='dd/MM/yyyy'  showYearDropdown scrollableMonthYearDropdown required />
      </div>
      <fieldset>
                <legend>Absence</legend>
                <div>
                  <div>
                    <input type='radio' name='isAbsent' id='isAbsent-true' value='true' checked={regularUpdatesDetails.isAbsent === true} onChange={handleInputChange} required/>
                    <label htmlFor='isAbsent-true'>
                      Absent
                    </label>
                  </div>
                  <div>
                    <input type='radio' name='isAbsent' id='isAbsent-false' value='false' checked={regularUpdatesDetails.isAbsent === false} onChange={handleInputChange} required/>
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
                    <input type='radio' name='hasCantine' id='hasCantine-true' value='true' checked={regularUpdatesDetails.hasCantine === true} onChange={handleInputChange} required/>
                    <label  htmlFor='hasCantine-true'>
                      Oui
                    </label>
                  </div>
                  <div>
                    <input type='radio' name='hasCantine' id='hasCantine-false' value='false' checked={regularUpdatesDetails.hasCantine === false} onChange={handleInputChange} required/>
                    <label htmlFor='hasCantine-false'>
                      Non
                    </label>
                  </div>
                </div>
              </fieldset>
          <label htmlFor='garderie'>Garderie</label>
          <select name='garderie' id='garderie' value={regularUpdatesDetails.garderie} onChange={handleInputChange} required>
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

export default EditRegularUpdates