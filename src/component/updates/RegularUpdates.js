import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

const RegularUpdates = () => {
  const navigate = useNavigate()
    const [regularUpdatesDTO, setRegularUpdatesDTO] = useState({
      studentId:'',
      userId:'',
      local_date_time:'', 
      isAbsent:'', 
      hasCantine:'', 
      garderie:'PETITE_SECTION', 
    })

    useEffect(() => {

    }, [])

    const handleInputChange = (e) => {
    const {name, value} = e.target
    const newValue = e.target.type === 'radio' ? (value === 'true') : value
    setRegularUpdatesDTO({... regularUpdatesDTO, [name]: newValue})

    const handleSubmit = async (e) => {
      e.preventDefault()
      const currentDateTime =  new Date().toLocaleString('fr-FR')
      const createdRegularUpdates = {...regularUpdatesDTO,local_date_time: currentDateTime}
      try{
        const response = await axios.post(`http://localhost:8080/updates/${studentId}`, createdRegularUpdates,{
      headers: {
              'Content-Type': 'application/json'
    },
    withCredentials : true
    })
      }catch (error) {
        console.error('Error:', error)
      }
    }
  }
  return (
    <div>
      <h2>Cantine, Présence, Gardeire</h2>
    <form onSubmit={handleSubmit}>
    <fieldset>
              <legend>Présence</legend>
              <div>
                <div>
                  <input type='radio' name='isAbsent' id='isAbsent-true' value='true' checked={regularUpdatesDTO.isAbsent === true} onChange={handleInputChange} />
                  <label htmlFor='isAbsent-true'>
                    Présent
                  </label>
                </div>
                <div>
                  <input type='radio' name='isAbsent' id='isAbsent-false' value='false' checked={regularUpdatesDTO.isAbsent === false} onChange={handleInputChange} />
                  <label htmlFor='isAbsent-false'>
                    Absent
                  </label>
                </div>
              </div>
            </fieldset>

            <fieldset>
              <legend>Cantine</legend>
              <div>
                <div>
                  <input type='radio' name='hasCantine' id='hasCantine-true' value='true' checked={regularUpdatesDTO.hasCantine === true} onChange={handleInputChange} />
                  <label  htmlFor='hasCantine-true'>
                    Oui
                  </label>
                </div>
                <div>
                  <input type='radio' name='hasCantine' id='hasCantine-false' value='false' checked={regularUpdatesDTO.hasCantine === false} onChange={handleInputChange} />
                  <label htmlFor='hasCantine-false'>
                    Non
                  </label>
                </div>
              </div>
            </fieldset>
        <label htmlFor='grade'>Classe</label>
        <select name='grade' id='grade' value={regularUpdatesDTO.grade} onChange={handleChange}>
          <option value='PETITE_SECTION'>Petite Section</option>
          <option value='MOYENNE_SECTION'>Moyenne Section</option>
          <option value='GRANDE_SECTION'>Grande Section</option>
          <option value='CP'>CP</option>
          <option value='CE1'>CE1</option>
          <option value='CE2'>CE2</option>
          <option value='CM1'>CM1</option>
          <option value='CM2'>CM2</option>
        </select>
        <button type='submit'>Save</button>
    </form>
    </div>
  )
}

export default RegularUpdates