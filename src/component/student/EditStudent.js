import axios from 'axios'
import React, { useEffect, useState } from 'react'
import DatePicker from 'react-datepicker'
import { Link, useNavigate, useParams } from 'react-router-dom'

const EditStudent = () => {
    let navigate = useNavigate()
    const {id} = useParams()

    const [studentDetails, setStudentDetails] = useState({
        name: '',
        birthday: new Date(),
        presence:true ,
        cantine: true,
    })

    useEffect(() =>{
        loadStudent()
    }, [])
    
    const loadStudent = async () =>{
      try{
        const result = await axios.get(`http://localhost:8080/students/${id}`)
        const studentData = { ...result.data, birthday: new Date(result.data.birthday) }
        setStudentDetails(studentData)
      } catch (error) {
        console.error('ERROR FETCHING STUDENT DETAILS :', error)
      }
      
      //setStudentDetails(result.data)  
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
    setStudentDetails({ ...studentDetails, birthday: date})
    }

    const updateStudent = async (e) => {
      e.preventDefault()

     // const formattedBirthday = studentDetails.birthday.toLocaleDateString('fr-FR')
      const formattedBirthday = `${studentDetails.birthday.getDate().toString().padStart(2, '0')}/${(studentDetails.birthday.getMonth() + 1).toString().padStart(2, '0')}/${studentDetails.birthday.getFullYear()}`
  
      try {
       const formData = new FormData()
       formData.append('studentDetails', JSON.stringify({ ...studentDetails, birthday: formattedBirthday }))
       formData.append('multipartFile', file)
       const response = await axios.put(`http://localhost:8080/students/${id}`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        })

        setStudentDetails(response.data)
         console.log('Response:', response.data)
   
        navigate('/view-students')
    
  
      } catch (error) {
        console.error('Error:', error);
      }
    }


  return (
  <div className='container'>
  <div className='d-flex justify-content-center'>
  <div className='card' style={{width:'50%'}}>
  <h2 className='mb-6 p-4 text-center'>Modifier L'Elève</h2>

  <form onSubmit={updateStudent} encType='multipart/form-data' method='post'>

  <div className='mb-4 p-4'>
    <label htmlFor='name' className='form-label'>Nom et Prénom</label>
    <input autoComplete="name" type='text' className='form-control' name='name' id='name' required onChange={handleInputChange} value={studentDetails.name}/>
  </div>

  <fieldset className='row mb-4 m-3'>
    <legend className='col-form-label col-sm-2 pt-0'>Présence</legend>
    <div className='col-sm-10'>
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

  <fieldset className='row mb-4 m-3'>
    <legend className='col-form-label col-sm-2 pt-0'>Cantine</legend>
    <div className='col-sm-10'>
      <div className='form-check'>
        <input className='form-check-input' type='radio' name='cantine' id='cantine-true' value='true' checked={studentDetails.cantine === true} onChange={handleInputChange}/>
        <label className='form-check-label' htmlFor='cantine-true'>
          Oui
        </label>
      </div>
      <div className='form-check'>
        <input className='form-check-input' type='radio' name='cantine' id='cantine-false' value='false' checked={studentDetails.cantine === false} onChange={handleInputChange}/>
        <label className='form-check-label' htmlFor='cantine-false'>
          Non
        </label>
      </div>
      </div>
  </fieldset>

  <div div className='m-4'>
  <label htmlFor="birthday" className="form-label">Date De Naissance</label>
    <DatePicker id='birthday' className='m-2 text-center' selected={new Date()} onChange={handleBirthdayChange} dateFormat ='dd/MM/yyyy' maxDate={new Date()} showYearDropdown scrollableMonthYearDropdown /> 
  </div>

  <div className='mb-4 p-4'>
  
  <input className='form-control col-sm-6' type='file' name='multipartFile' id='multipartFile' accept='.jpeg, .jpg, .png' onChange={handleFileChange} />
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

export default EditStudent
