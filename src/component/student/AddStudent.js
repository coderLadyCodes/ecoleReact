import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import { useAuth } from '../user/AuthProvider'
import './AddStudent.css'

const AddStudent = () => {
  const {user} =  useAuth()
  let navigate = useNavigate()

  const [studentDTO, setStudentDTO] = useState({
    name: '',
    birthday: new Date(),
    grade:'PETITE_SECTION',
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
    //const newValue = e.target.type === 'radio' ? (value === 'true') : value
    //setStudentDTO({ ...studentDTO, [name]: newValue })
    setStudentDTO({ ... studentDTO, [name] : value})
  }

  const handleBirthdayChange = (date) => {
    setStudentDTO({ ...studentDTO, birthday: date })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    const formattedBirthday = studentDTO.birthday.toLocaleDateString('fr-FR')

    try {
      const formData = new FormData()
      //formData.append('studentDTO', JSON.stringify({ ...studentDTO, birthday: formattedBirthday }))
      //formData.append('multipartFile', file)

      formData.append('studentDTO', new Blob([JSON.stringify({ ...studentDTO, birthday: formattedBirthday })], { type: 'application/json' }))
      
      if (file) {
        formData.append('multipartFile', file)
      }

      const response = await axios.post(`${process.env.REACT_APP_API_URL}/students`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        withCredentials: true

      })

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
    <div className="addstudent-container">
      <h2 className="addstudent-title">Ajouter L'Enfant</h2>

      <form className="addstudent-form" onSubmit={handleSubmit} encType="multipart/form-data" method="post">
        <div className="addstudent-form-group">
          <label htmlFor="name">Nom et Prénom</label>
          <input
            autoComplete="name"
            type="text"
            className="form-control"
            name="name"
            id="name"
            required
            onChange={handleInputChange}
            value={studentDTO.name}
          />
        </div>

        <div className="addstudent-form-group">
          <label htmlFor="birthday">Date De Naissance</label>
          <DatePicker
            id="birthday"
            selected={studentDTO.birthday}
            onChange={handleBirthdayChange}
            dateFormat="dd/MM/yyyy"
            maxDate={new Date()}
            showYearDropdown
            scrollableMonthYearDropdown
            required
          />
        </div>

        <div className="addstudent-form-group">
          <label htmlFor="grade">Classe</label>
          <select name="grade" id="grade" value={studentDTO.grade} onChange={handleInputChange}>
            <option value="PETITE_SECTION">Petite Section</option>
            <option value="MOYENNE_SECTION">Moyenne Section</option>
            <option value="GRANDE_SECTION">Grande Section</option>
            <option value="CP">CP</option>
            <option value="CE1">CE1</option>
            <option value="CE2">CE2</option>
            <option value="CM1">CM1</option>
            <option value="CM2">CM2</option>
          </select>
        </div>

        <div className="addstudent-file-upload">
          <input type="file" name="multipartFile" id="multipartFile" accept=".jpeg, .jpg, .png" onChange={handleFileChange} />
        </div>
        <p className="addstudent-file-size">Taille max du fichier : 500KB</p>

        <div className="addstudent-actions">
          <button type="submit">Sauvegarder</button>
          <Link to="/dashboard" type="submit">
            Annuler
          </Link>
        </div>
      </form>
    </div>
  )
}

export default AddStudent
