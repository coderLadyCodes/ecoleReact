import React, { useState } from 'react'
import { useAuth } from '../user/AuthProvider'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'

const Acces = () => {
  let navigate = useNavigate()
  const {role, userId} = useAuth()
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
  return (
    <>
      { role == 'ADMIN' && (  
    <form onSubmit={handleSubmit}>
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
        <button type='submit'>Save</button>
    </form>
         
      )}
      { role == 'SUPER_ADMIN' && (  
    <form onSubmit={handleSubmit}>
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
        <button type='submit'>Save</button>
    </form>
         
      )}
  
  </>    
    
  )
}

export default Acces