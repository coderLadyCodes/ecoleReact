import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useAuth } from '../user/AuthProvider'

export const AccessCode = () => {
    const {userId} = useAuth()
    let navigate = useNavigate()
    const [activation, setActivation] = useState({
        classroomCode:'',
        teacher:'',
        userId:userId,
    })
    useEffect(() => {
      if (userId) {
        setActivation(prevState => ({
            ...prevState, userId: userId
        }))
    }
    }, [userId])

{/*   useEffect(() => {
      const classroomId = localStorage.getItem('classroomId')
      const classroomCode = localStorage.getItem('classroomCode')
      const teacher = localStorage.getItem('teacher')

      if (classroomId && classroomCode && teacher) {
          navigate(`/classroom/${classroomId}`, { state: { classroomCode, teacher } })
      }
  }, [navigate])*/}

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

        const {classroomId, classroomCode, teacher} = response.data
        if (classroomId) {
        {/*localStorage.setItem('classroomId', classroomId)
        localStorage.setItem('classroomCode', classroomCode)
        localStorage.setItem('teacher', teacher)*/}

        navigate(`/classroom/${classroomId}`, { state: {classroomCode, teacher} })
      } else {
          console.error('No classroom ID returned')
          alert('Error: No classroom ID returned')
      }

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
