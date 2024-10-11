import React, { useState } from 'react'
import { useAuth } from '../user/AuthProvider'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import './Access.css'

const Acces = () => {
  let navigate = useNavigate()
  const {role, userId, user} = useAuth()
  const [classroom, setClassroom] =  useState({
    grade:'PETITE_SECTION',
    userId:userId,
    classroomCode:'',
    teacher:'',
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
    
  navigate('/accesscode')
  } catch (error) {
    console.error('Error:', error)
  }
}

if (!user) {
  navigate('/connexion')
  return <p>Vous devez etre connecter a votre compte</p>
}
  return (
    <>
        {role === 'ADMIN' && (  
    <div className='form-container'>
      <form onSubmit={handleSubmit} className='form-wrapper'>
        <label htmlFor='grade'>Classe</label>
        <select name='grade' id='grade' value={classroom.grade} onChange={handleChange}>
          <option value='PETITE_SECTION'>Petite Section</option>
          <option value='MOYENNE_SECTION'>Moyenne Section</option>
          <option value='GRANDE_SECTION'>Grande Section</option>
          <option value='CP'>CP</option>
          <option value='CE1'>CE1</option>
          <option value='CE2'>CE2</option>
          <option value='CM1'>CM1</option>
          <option value='CM2'>CM2</option>
        </select>
        <button type='submit'>Ok</button>
      </form>
    </div>
  )}
  {role === 'SUPER_ADMIN' && (  
    <div className='form-container'>
      <form onSubmit={handleSubmit} className='form-wrapper'>
        <label htmlFor='grade'>Classe</label>
        <select name='grade' id='grade' value={classroom.grade} onChange={handleChange}>
          <option value='PETITE_SECTION'>Petite Section</option>
          <option value='MOYENNE_SECTION'>Moyenne Section</option>
          <option value='GRANDE_SECTION'>Grande Section</option>
          <option value='CP'>CP</option>
          <option value='CE1'>CE1</option>
          <option value='CE2'>CE2</option>
          <option value='CM1'>CM1</option>
          <option value='CM2'>CM2</option>
        </select>
        <button type='submit'>Ok</button>
      </form>
    </div>
  )}
  </>    
    
  )
}

export default Acces