import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useAuth } from '../user/AuthProvider'
import KidsParent from '../student/KidsParent'
import './AccessCode.css'

export const AccessCode = () => {
    const {userId, user, role} = useAuth()
    let navigate = useNavigate()
    const [activation, setActivation] = useState({
        classroomCode:'',
        teacher:'',
        userId:userId,
        kidId:''
    })
    const [error, setError] = useState('')
    useEffect(() => {
      if (userId) {
        setActivation(prevState => ({
            ...prevState, userId: userId
        }))
    }
    }, [userId])

    const handleChange = (e) => {
      const { name, value } = e.target
      const theValue = name === 'classroomCode' ? value.replace(/\s/g, '') : value
        setActivation(prevState => ({
          ...prevState, [name] : theValue
        }))
    }

    const handleKidSelect = (kidId) => {
      setActivation(prevState =>({
        ...prevState, kidId: kidId
      }))
    }
    const handleSubmit = async (e) => {
        e.preventDefault()
        setError('')
        try {
        const response = await axios.post(`${process.env.REACT_APP_API_URL}/classroom/activation`, activation,{
            headers: {
              'Content-Type': 'application/json',
            },
          })

        const {classroomId, classroomCode, teacher} = response.data
        if (classroomId) {
        navigate(`/classroom/${classroomId}`, { state: {classroomCode, teacher} })
      } else {
          console.error('No classroom ID returned')
          alert('Error: No classroom ID returned')
      }

    } catch (error) {

      if (error.response) {
        if (error.response.status === 400) {
            setError(`${error.response.data.message}`)
        } else if (error.response.status === 404) {
            setError(`${error.response.data.message}`)
        } else if (error.response.status === 403) {
            setError(`${error.response.data.message}`)
        } else {
            setError(`Error: ${error.response.data.message}`)
        }
    } else if (error.request) {
        setError('No response received from the server.')
    } else {
        setError(`Error: ${error.message}`)
    }
}
    }
    if (!user) {
      navigate('/connexion')
      return <p>Vous devez etre connecter a votre compte</p>
    }

  return (
    <div className='accesscode-container'>
  <h1>Acceder à la classe</h1>
  {error && <p className='accesscode-error'>{error}</p>}

  {role === 'PARENT' && (
    <>
      <KidsParent onSelectKid={handleKidSelect} />

      <form onSubmit={handleSubmit} className='accesscode-form'>
        <label htmlFor='classroomCode'>Code</label>
        <input
          placeholder='code'
          type='text'
          name='classroomCode'
          id='classroomCode'
          onChange={handleChange}
          value={activation.classroomCode}
          required
        />

        <label htmlFor='teacher'>Nom de l'enseignant</label>
        <input
          placeholder="Nom de l'enseignant"
          type='text'
          name='teacher'
          id='teacher'
          onChange={handleChange}
          value={activation.teacher}
          required
        />

        <button type='submit' disabled={!activation.kidId}>Activer</button>
      </form>
    </>
  )}

  {(role === 'ADMIN' || role === 'SUPER_ADMIN') && (
    <form onSubmit={handleSubmit} className='accesscode-form'>
      <label htmlFor='classroomCode'>Code</label>
      <input
        placeholder='code'
        type='text'
        name='classroomCode'
        id='classroomCode'
        onChange={handleChange}
        value={activation.classroomCode}
        required
      />
      <button type='submit'>Activer</button>
    </form>
  )}
</div>
  )
}
