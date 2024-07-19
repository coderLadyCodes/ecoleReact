import axios from 'axios'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../user/AuthProvider'

export const AccessCode = () => {
    const {userId} = useAuth()
    let navigate = useNavigate()
    const [activation, setActivation] = useState({
        classroomCode:'',
        userId: userId,
    })
    const handleChange = (e) => {
        const { name, value } = e.target
        setActivation({ ...activation, [name]: value })
    }
    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
        const response = await axios.post('http://localhost:8080/classroom/activation', activation,{
            headers: {
              'Content-Type': 'application/json',
            },
          })
        navigate('/classrooms')
    } catch (error) {
      alert('Veuillez fournir le bon code')
      console.error('Error:', error)
    }
    }
  return (
    <div>
        <h1>Acceder à la classe</h1>

        <form onSubmit={handleSubmit}>
        <label htmlFor='classroomCode'>Code</label>
            <input placeholder='code' type="text"  name='classroomCode' id='classroomCode' onChange={handleChange} value={activation.classroomCode} required/> 
        <button type='submit'>Activer</button>
        </form>
    </div>
  )
}
