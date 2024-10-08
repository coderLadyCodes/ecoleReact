import axios from 'axios'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './ChangePassword.css'

const ChangePassword = () => {
  let navigate = useNavigate()
  const [activation, setActivation]= useState({
    email:''
  })
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')

  const handleChange = (e) => {
    const { name, value } = e.target
    setActivation({ ...activation, [name]: value })
}

  const handleSubmit = async (e) => {
    e.preventDefault()
    try{
      const response = await axios.post('http://localhost:8080/change-password', activation, {
        headers: {
          'Content-Type': 'application/json',
        },
      })
      setMessage('Consultez votre adresse mail et suivez les insctructions')
      setError('')
      navigate('/new-password')
    } catch (error) {
      console.error('Error:', error.response?.data)
      setError(error.response?.data ||'An error occurred. Please try again.')
      setMessage('')
    }
  }
  return (
    <div className='change-password-container'>
    <h1 className='change-password-title'>Réinitialisez votre mot de passe</h1>
    <h2 className='change-password-subtitle'>Entrez votre Email</h2>
    <p className='change-password-note'>**Consultez aussi vos courriers indésirables**</p>
    {message && <p className='change-password-message'>{message}</p>}
    {error && <p className='change-password-error'>{error}</p>}

    <form onSubmit={handleSubmit} className='change-password-form'>
      <div className='change-password-input'>
        <label htmlFor='email' className='change-password-label'>Email</label>
        <input
          placeholder='Email'
          type="email"
          name='email'
          id='email'
          onChange={handleChange}
          value={activation.email}
          required
          className='change-password-text-input'
        />
      </div>

      <button type='submit' className='change-password-submit-btn'>Envoyer</button>
    </form>
  </div>
  )
}

export default ChangePassword