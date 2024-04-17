import React, { useState } from 'react'
import {Link, useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import {FaCalendarAlt} from 'react-icons/fa'

const AddStudent = () => {

    let navigate = useNavigate()
    const {userId} = useParams()
    const [studentDTO, setStudentDTO] = useState({
        name: '',
        birthday: new Date(),
        presence: false,
        cantine: false,
        userId:userId,
    })

    const [file, setFile] = useState(null)
    
    const handleFileChange = (e) => {
      const selectedFile = e.target.files[0]
      const maxSizeInBytes = 0.5 * 1024 * 1024
  
      if (selectedFile && selectedFile.size > maxSizeInBytes) {
        alert('La taille du fichier excede 500KB, veuillez reduire le volume svp')
        setFile(null)
      } else {
        setFile(selectedFile)
      }
    }

    const handleInputChange = (e) => {
      const { name, value } = e.target
      const newValue = e.target.type === 'radio' ? (value === 'true') : value
      setStudentDTO({ ...studentDTO, [name]: newValue })
    }

    const handleBirthdayChange = (date) => {
      setStudentDTO({ ...studentDTO, birthday: date })
    }

    const handleSubmit = async (e) => {
      e.preventDefault()

      const formattedBirthday = studentDTO.birthday.toLocaleDateString('fr-FR')
  
           try {
        const formData = new FormData()
        formData.append('studentDTO', JSON.stringify({ ...studentDTO, birthday: formattedBirthday }))
        formData.append('multipartFile', file)
        console.log(formData)
        const response = await axios.post('http://localhost:8080/students', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
      
        })
   
       // navigate(`/user-profile/${userId}`)
       navigate(`/student-profile/${userId}`)
    
  
      } catch (error) {
        console.error('Error:', error)
      }
    }

  return (
  <div>
  <div>
  <div style={{width:'50%'}}>
  <h2>Ajouter L'Enfant</h2>

  <form onSubmit={handleSubmit} encType='multipart/form-data' method='post'>

  <div>
    <label htmlFor='name' className='form-label'>Nom et Prénom</label>
    <input autoComplete="name" type='text' className='form-control' name='name' id='name' required onChange={handleInputChange} value={studentDTO.name}/>
  </div>

  <fieldset>
    <legend>Présence</legend>
    <div>
      <div>
        <input className='form-check-input' type='radio' name='presence' id='presence-true' value='true' checked={studentDTO.presence === true} onChange={handleInputChange}/>
        <label className='form-check-label' htmlFor='presence-true'>
          Présent
        </label>
      </div>
      <div>
        <input className='form-check-input' type='radio' name='presence' id='presence-false' value='false' checked={studentDTO.presence === false} onChange={handleInputChange}/>
        <label className='form-check-label' htmlFor='presence-false'>
          Absent
        </label>
      </div>
      </div>
  </fieldset>

  <fieldset>
    <legend>Cantine</legend>
    <div>
      <div>
        <input className='form-check-input' type='radio' name='cantine' id='cantine-true' value='true' checked={studentDTO.cantine === true} onChange={handleInputChange}/>
        <label className='form-check-label' htmlFor='cantine-true'>
          Oui
        </label>
      </div>
      <div>
        <input className='form-check-input' type='radio' name='cantine' id='cantine-false' value='false' checked={studentDTO.cantine === false} onChange={handleInputChange}/>
        <label className='form-check-label' htmlFor='cantine-false'>
          Non
        </label>
      </div>
      </div>
  </fieldset>

  <div>
  <label htmlFor="birthday" className="form-label">Date De Naissance</label>
    <DatePicker id='birthday' className='m-2 text-center' selected={studentDTO.birthday} onChange={handleBirthdayChange} dateFormat ='dd/MM/yyyy' maxDate={new Date()} showYearDropdown scrollableMonthYearDropdown required/> 
  </div>

  <div> 
  <input type='file' name='multipartFile' id='multipartFile' accept='.jpeg, .jpg, .png' onChange={handleFileChange} required/>
  </div>
     <p>taille max du fichier : 500KB</p>

  <div>
            <div>
              <button type='submit'>Save</button>
            </div>
            <div>
              <Link to={`/student-profile/${userId}`}  type='submit'>Cancel</Link>
            </div>
          </div>
  </form>
  </div>
  </div>
  </div>
  )
}

export default AddStudent
