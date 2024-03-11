import React, { useState } from 'react'
import {Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import {FaCalendarAlt} from 'react-icons/fa'

const AddStudent = () => {

    let navigate = useNavigate()

    const [studentDTO, setStudentDTO] = useState({
        name: '',
        birthday: new Date(),
        presence: false,
        cantine: false,
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
      setStudentDTO({ ...studentDTO, birthday: date });
    }

    const handleSubmit = async (e) => {
      e.preventDefault()

      const formattedBirthday = studentDTO.birthday.toLocaleDateString('fr-FR')
  
           try {
        const formData = new FormData();
        formData.append('studentDTO', JSON.stringify({ ...studentDTO, birthday: formattedBirthday }))
        formData.append('multipartFile', file)
        console.log(formData);
        const response = await axios.post('http://localhost:8080/students', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
   
        navigate('/view-students');
    
  
      } catch (error) {
        console.error('Error:', error);
      }
    }

  return (
  <div className='container'>
  <div className='d-flex justify-content-center'>
  <div className='card' style={{width:'50%'}}>
  <h2 className='mb-6 p-4 text-center'>Ajouter un Elève</h2>

  <form onSubmit={handleSubmit} encType='multipart/form-data' method='post'>

  <div className='mb-4 p-4'>
    <label htmlFor='name' className='form-label'>Nom et Prénom</label>
    <input autoComplete="name" type='text' className='form-control' name='name' id='name' required onChange={handleInputChange} value={studentDTO.name}/>
  </div>

  <fieldset className='row mb-4 m-3'>
    <legend className='col-form-label col-sm-2 pt-0'>Présence</legend>
    <div className='col-sm-10'>
      <div className='form-check'>
        <input className='form-check-input' type='radio' name='presence' id='presence-true' value='true' checked={studentDTO.presence === true} onChange={handleInputChange}/>
        <label className='form-check-label' htmlFor='presence-true'>
          Présent
        </label>
      </div>
      <div className='form-check'>
        <input className='form-check-input' type='radio' name='presence' id='presence-false' value='false' checked={studentDTO.presence === false} onChange={handleInputChange}/>
        <label className='form-check-label' htmlFor='presence-false'>
          Absent
        </label>
      </div>
      </div>
  </fieldset>

  <fieldset className='row mb-4 m-3'>
    <legend className='col-form-label col-sm-2 pt-0'>Cantine</legend>
    <div className='col-sm-10'>
      <div className='form-check'>
        <input className='form-check-input' type='radio' name='cantine' id='cantine-true' value='true' checked={studentDTO.cantine === true} onChange={handleInputChange}/>
        <label className='form-check-label' htmlFor='cantine-true'>
          Oui
        </label>
      </div>
      <div className='form-check'>
        <input className='form-check-input' type='radio' name='cantine' id='cantine-false' value='false' checked={studentDTO.cantine === false} onChange={handleInputChange}/>
        <label className='form-check-label' htmlFor='cantine-false'>
          Non
        </label>
      </div>
      </div>
  </fieldset>

  <div div className='m-4'>
  <label htmlFor="birthday" className="form-label">Date De Naissance</label>
    <DatePicker id='birthday' className='m-2 text-center' selected={studentDTO.birthday} onChange={handleBirthdayChange} dateFormat ='dd/MM/yyyy' maxDate={new Date()} showYearDropdown scrollableMonthYearDropdown required/> 
  </div>

  <div className='mb-4 p-4'>
  
  <input className='form-control col-sm-6' type='file' name='multipartFile' id='multipartFile' accept='.jpeg, .jpg, .png' onChange={handleFileChange} required/>
  </div>
     <p className='info-message text-center'>taille max du fichier : 500KB</p>

  <div className='d-flex justify-content-center p-4'>
            <div className='p-4'>
              <button type='submit' className='btn btn-outline-success btn-ls'>Save</button>
            </div>
            <div className='p-4'>
              <Link to={'/view-students'}  type='submit' className='btn btn-outline-warning btn-ls'>Cancel</Link>
            </div>
          </div>
  </form>
  </div>
  </div>
  </div>
  )
}

export default AddStudent
