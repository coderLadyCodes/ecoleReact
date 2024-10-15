import axios from 'axios'
import React, { useEffect, useState } from 'react'
import DatePicker from 'react-datepicker'
import { Link, useNavigate, useParams } from 'react-router-dom'
import './EditStudent.css'

const EditStudent = () => {
    let navigate = useNavigate()
    const {id} = useParams()

    const [studentDetails, setStudentDetails] = useState({
        name: '',
        birthday: new Date(),
        grade:'PETITE_SECTION',
    })

    useEffect(() =>{
        loadStudent()
    }, [id])
    
    const loadStudent = async () =>{
      try{
      const result = await axios.get(`${process.env.REACT_APP_API_URL}/students/student/${id}`, { withCredentials: true })
      setStudentDetails({...result.data, birthday: new Date()})
   } catch (error) {
      console.error('Error loading student details:', error)
    }
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
      setStudentDetails({ ... studentDetails, [name]: value})
    }
  
    const handleBirthdayChange = (date) => {
    setStudentDetails({...studentDetails, birthday : date})
}


    const updateStudent = async (e) => {
      e.preventDefault()
        const formattedBirthday = studentDetails.birthday.toLocaleDateString('fr-FR') 
          
      try {
      const formData = new FormData()
      formData.append('studentDetails', JSON.stringify({ ...studentDetails, birthday: formattedBirthday }))
      formData.append('studentDetails', studentDetails)
      formData.append('multipartFile', file)    
      const response = await axios.put(`${process.env.REACT_APP_API_URL}/students/${id}`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          }, withCredentials: true
        })

        setStudentDetails(response.data)
        navigate(`/student-profile/${id}`)
  
      } catch (error) {
        console.error('Error:', error)
      }
    }


  return (
  <div className="edit-student-container">
      <div className="edit-student-form-container">
        <h2>Modifier L'Elève</h2>

        <form onSubmit={updateStudent} encType="multipart/form-data" method="post">
          <div className="edit-student-form-group">
            <label htmlFor="name">Nom et Prénom</label>
            <input
              autoComplete="name"
              type="text"
              name="name"
              id="name"
              required
              onChange={handleInputChange}
              value={studentDetails.name}
            />
          </div>

          <div className="edit-student-form-group">
            <label htmlFor="birthday">Date De Naissance</label>
            <DatePicker
              id="birthday"
              selected={studentDetails.birthday}
              onChange={handleBirthdayChange}
              dateFormat="dd/MM/yyyy"
              maxDate={new Date()}
              showYearDropdown
              scrollableMonthYearDropdown
            />
          </div>

          <div className="edit-student-form-group">
            <label htmlFor="grade">Classe</label>
            <select name="grade" id="grade" value={studentDetails.grade} onChange={handleInputChange}>
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

          <div className="edit-student-form-group">
            <input type="file" name="multipartFile" id="multipartFile" accept=".jpeg, .jpg, .png" onChange={handleFileChange} />
          </div>
          <p className="edit-student-file-info">Taille max du fichier : 500KB</p>

          <div className="edit-student-btn-group">
            <button type="submit">Enregistrer</button>
            <button>
              <Link to={`/student-profile/${id}`} type="submit">
                Annuler
              </Link>
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default EditStudent
