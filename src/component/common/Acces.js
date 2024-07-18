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

      { role == 'PARENT' && (<Link to='/accesscode'>Accéder à la classe de votre enfant</Link>)}
      { role == 'ADMIN' && (  
    <form onSubmit={handleSubmit}>
        <label htmlFor='grade'>Classe</label>
        <select name='grade' id='grade' value={classroom.classe} onChange={handleChange}>
          <option value='PETITE_SECTION'>Petite Section</option>
          <option value='MOYENNE_SECTION'>Moyenne Section</option>
          <option value='GRANDE_SECTION'>Grande Section</option>
        </select>
        <button type='submit'>Save</button>
    </form>
         
      )}
      { role == 'SUPER_ADMIN' && (  
    <form onSubmit={handleSubmit}>
        <label htmlFor='grade'>Classe</label>
        <select name='grade' id='grade' value={classroom.classe} onChange={handleChange}>
          <option value='PETITE_SECTION'>Petite Section</option>
          <option value='MOYENNE_SECTION'>Moyenne Section</option>
          <option value='GRANDE_SECTION'>Grande Section</option>
        </select>
        <button type='submit'>Save</button>
    </form>
         
      )}
  
  </>    
    
  )
}

export default Acces