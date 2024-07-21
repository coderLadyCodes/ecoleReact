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
        const noWhiteSpaceValue = value.replace(/\s/g, '')
        setActivation(prevState => ({
          ...prevState, [name] : noWhiteSpaceValue
        }))
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

      if (error.reponse) {

        if (error.response.status === 400){
          console.error('Bad Request:', error.response.data.message)
          alert(`Error: ${error.response.data.message}`)
        } else {
          console.error('Error:', error.response.data)
          alert(`Error: ${error.response.data.message}`)
        }

      } else if (error.request){
        console.error('No response received:', error.request)
        alert('No response received from the server.')
      } else {
        console.error('Error:', error.message)
        alert(`Error: ${error.message}`)
      }
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
