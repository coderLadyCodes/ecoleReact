import React, { useState } from 'react'
import { useAuth } from '../user/AuthProvider'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'

const Acces = () => {
  let navigate = useNavigate()
  const {role, userId} = useAuth()
  const [classroom, setClassroom] =  useState({
    grade:'',
    userId:userId,
    classroomCode:'',
  })

  const handleChange = (e) => {
    const {name, value} = e.target
    setClassroom({...classroom, [name] : value})
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try{
      const response = await axios.post('http://localhost:8080/classroom', classroom,{
      headers: {
              'Content-Type': 'application/json'
    }, 
    withCredentials : true
    })
 navigate('/classroom')
  } catch (error) {
    console.error('Error:', error)
  }
}
  return (
    <div>
      { role == 'PARENT' && (<Link to='/accesscode'>Accéder à la classe de votre enfant</Link>)}
      { role == 'ADMIN' && (
      <h1>Creer une Classe</h1>
      )}
      
      
    </div>
    
  )
}

export default Acces