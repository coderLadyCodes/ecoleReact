import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import { useAuth } from '../common/AuthProvider'

const AddStudent = () => {
  const {user} =  useAuth()
  let navigate = useNavigate()

  const [studentDTO, setStudentDTO] = useState({
    name: '',
    birthday: new Date(),
    classe:'',
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
    setStudentDTO({ ...studentDTO, birthday: date })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    const formattedBirthday = studentDTO.birthday.toLocaleDateString('fr-FR')

    try {
      const formData = new FormData()
      formData.append('studentDTO', JSON.stringify({ ...studentDTO, birthday: formattedBirthday }))
      formData.append('multipartFile', file)
      const response = await axios.post('http://localhost:8080/students', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          //'Authorization': `Bearer ${token}`
        },
        withCredentials: true

      })
       //console.log("response data add studend from backend : ", response)

      if (response.data && response.data.id) {
        const id = response.data.id
    
        navigate(`/student-profile/${id}`)
      }  else {
        console.error('Invalid response from server:', response)
        alert('Error: Failed to create student.')
      }   

    } catch (error) {
      console.error('Error:', error)
    }
  }
  if (!user) {
    navigate('/connexion')
    return <p>Vous devez etre connecter a votre compte</p>
  }

  return (
    <div>
      <div>
        <div style={{ width: '50%' }}>
          <h2>Ajouter L'Enfant</h2>

          <form onSubmit={handleSubmit} encType='multipart/form-data' method='post'>

            <div>
              <label htmlFor='name'>Nom et Prénom</label>
              <input autoComplete="name" type='text' className='form-control' name='name' id='name' required onChange={handleInputChange} value={studentDTO.name} />
            </div>

            <fieldset>
              <legend>Présence</legend>
              <div>
                <div>
                  <input type='radio' name='presence' id='presence-true' value='true' checked={studentDTO.presence === true} onChange={handleInputChange} />
                  <label htmlFor='presence-true'>
                    Présent
                  </label>
                </div>
                <div>
                  <input type='radio' name='presence' id='presence-false' value='false' checked={studentDTO.presence === false} onChange={handleInputChange} />
                  <label htmlFor='presence-false'>
                    Absent
                  </label>
                </div>
              </div>
            </fieldset>

            <fieldset>
              <legend>Cantine</legend>
              <div>
                <div>
                  <input type='radio' name='cantine' id='cantine-true' value='true' checked={studentDTO.cantine === true} onChange={handleInputChange} />
                  <label  htmlFor='cantine-true'>
                    Oui
                  </label>
                </div>
                <div>
                  <input type='radio' name='cantine' id='cantine-false' value='false' checked={studentDTO.cantine === false} onChange={handleInputChange} />
                  <label htmlFor='cantine-false'>
                    Non
                  </label>
                </div>
              </div>
            </fieldset>

            <div>
              <label htmlFor="birthday" >Date De Naissance</label>
              <DatePicker id='birthday'  selected={studentDTO.birthday} onChange={handleBirthdayChange} dateFormat='dd/MM/yyyy' maxDate={new Date()} showYearDropdown scrollableMonthYearDropdown required />
            </div>

            <div>
              <label htmlFor='classe'>Classe</label>
              <select name='classe' id='classe' value={studentDTO.classe} onChange={handleInputChange}>
                <option defaultValue='none'>Select an Option</option>
                <option value='Petite Section'>Petite Section</option>
                <option value='Moyenne Section'>Moyenne Section</option>
                <option value='Grande Section'>Grande Section</option>
              </select>
              {/*input autoComplete="classe" type='text'  name='classe' id='classe' required onChange={handleInputChange} value={studentDTO.classe} />*/}
            </div>

            <div>
              <input type='file' name='multipartFile' id='multipartFile' accept='.jpeg, .jpg, .png' onChange={handleFileChange}/>
            </div>
            <p>taille max du fichier : 500KB</p>

            <div>
              <div>
                <button type='submit'>Save</button>
              </div>
              <div>
                <Link to={'/dashboard'} type='submit'>Cancel</Link>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default AddStudent
