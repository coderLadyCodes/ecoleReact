import axios from 'axios'
import React, { useEffect, useState } from 'react'
import DatePicker from 'react-datepicker'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { useAuth } from '../common/AuthProvider'

const EditStudent = () => {
    let navigate = useNavigate()
    //const {token} = useAuth()
    const {id} = useParams()

    const [studentDetails, setStudentDetails] = useState({
        name: '',
        birthday: null,
        classe:'',
        presence:true ,
        cantine: true,
    })

    useEffect(() =>{
        loadStudent()
    }, [])
    
    const loadStudent = async () =>{
      const result = await axios.get(`http://localhost:8080/students/${id}`)
      setStudentDetails(result.data)
    }

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
      setStudentDetails((prevStudentDetails) => ({ ...prevStudentDetails, [name]: newValue }))
    }
  
    const handleBirthdayChange = (date) => {
    setStudentDetails({ ...studentDetails, birthday: date })
    }

    const updateStudent = async (e) => {
      e.preventDefault()

     const formattedBirthday = new Date(studentDetails.birthday).toLocaleDateString('fr-FR')
     //const formattedBirthday = `${studentDetails.birthday.getDate().toString().padStart(2, '0')}/${(studentDetails.birthday.getMonth() + 1).toString().padStart(2, '0')}/${studentDetails.birthday.getFullYear()}`
    
      try {
       const formData = new FormData()
       formData.append('studentDetails', JSON.stringify({ ...studentDetails, birthday: formattedBirthday }))
       formData.append('multipartFile', file)
       const response = await axios.put(`http://localhost:8080/students/${id}`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
            //'Authorization': `Bearer ${token}`
          },
        })

        setStudentDetails(response.data)
        navigate(`/student-profile/${id}`)
  
      } catch (error) {
        console.error('Error:', error);
      }
    }


  return (
  <div>
  <div>
  <div style={{width:'50%'}}>
  <h2>Modifier L'Elève</h2>

  <form onSubmit={updateStudent} encType='multipart/form-data' method='post'>

  <div>
    <label htmlFor='name' className='form-label'>Nom et Prénom</label>
    <input autoComplete="name" type='text' className='form-control' name='name' id='name' required onChange={handleInputChange} value={studentDetails.name}/>
  </div>

  <fieldset>
    <legend>Présence</legend>
    <div>
      <div className='form-check'>
        <input className='form-check-input' type='radio' name='presence' id='presence-true' value='true' checked={studentDetails.presence === true} onChange={handleInputChange}/>
        <label className='form-check-label' htmlFor='presence-true'>
          Présent
        </label>
      </div>
      <div className='form-check'>
        <input className='form-check-input' type='radio' name='presence' id='presence-false' value='false' checked={studentDetails.presence === false} onChange={handleInputChange}/>
        <label className='form-check-label' htmlFor='presence-false'>
          Absent
        </label>
      </div>
      </div>
  </fieldset>

  <fieldset>
    <legend>Cantine</legend>
    <div>
      <div className='form-check'>
        <input className='form-check-input' type='radio' name='cantine' id='cantine-true' value='true' checked={studentDetails.cantine === true} onChange={handleInputChange}/>
        <label className='form-check-label' htmlFor='cantine-true'>
          Oui
        </label>
      </div>
      <div className='form-check'>
        <input className='form-check-input' type='radio' name='cantine' id='cantine-false' value='false' checked={studentDetails.cantine === false} onChange={handleInputChange}/>
        <label htmlFor='cantine-false'>
          Non
        </label>
      </div>
      </div>
  </fieldset>

  <div>
  <label htmlFor="birthday">Date De Naissance</label>
    <DatePicker id='birthday' selected={studentDetails.birthday} onChange={handleBirthdayChange} dateFormat ='yyyy-MM-dd' maxDate={new Date()} showYearDropdown scrollableMonthYearDropdown /> 
  </div>

  <div>
      <label htmlFor='classe'>Classe</label>
      <select name='classe' id='classe' value={studentDetails.classe} onChange={handleInputChange}>
        <option defaultValue='none'>Select an Option</option>
        <option value='Petite Section'>Petite Section</option>
        <option value='Moyenne Section'>Moyenne Section</option>
        <option value='Grande Section'>Grande Section</option>
      </select>
  </div>

  <div>
  <input type='file' name='multipartFile' id='multipartFile' accept='.jpeg, .jpg, .png' onChange={handleFileChange} />
  </div>
     <p>taille max du fichier : 500KB</p>

  <div>
            <div>
              <button type='submit'>Save</button>
            </div>
            <div>
              <button><Link to={`/student-profil/${id}`}  type='submit'>Annuler</Link></button>
            </div>
          </div>
  </form>
  </div>
  </div>
  </div>
  )
}

export default EditStudent
