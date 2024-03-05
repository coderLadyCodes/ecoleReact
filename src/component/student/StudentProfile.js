import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

const StudentProfile = () => {

  const {id} = useParams()

  const [studentDTO, setStudentDTO] = useState({
    name : '',
    birthday : null,
    presence : false,
    cantine : false,
    multipartFile: '',
  })

  useEffect(() =>{
    loadStudent()
  }, [])

  const loadStudent = async () =>{
    try{
      const result = await axios.get(`http://localhost:8080/students/${id}`)
      setStudentDTO(result.data)
    }catch (error) {
      console.error('Error: ', error)
    }
  }
  return (
  
  <section>
    
  </section>

  )
}

export default StudentProfile
