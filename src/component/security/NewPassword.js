import axios from 'axios'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './NewPassword.css'


const NewPassword = () => {
    let navigate = useNavigate()

    const [activation, setActivation] = useState({
        email:'',
        code:'',
        password:''
    })

    const [message, setMessage] = useState('')
    const [error, setError] = useState('')

    const handleChange = (e) => {
        const {name, value} = e.target
        setActivation({...activation, [name] : value})
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        try{
            const response = await axios.post('http://localhost:8080/new-password', activation,{
                headers: {
                    'Content-Type': 'application/json',

                  },
                  withCredentials: true
            })
            setMessage('Votre mot de passe est modifié')
            setError('')
            navigate('/connexion')
        } catch (error) {
            setError(error.response?.data?.message||'An error occurred. Please try again.')
            setMessage('')
        }
    }
  return (
    <div className='reset-container'>
    <h1 className='reset-title'>Réinitialisez votre mot de passe</h1>
    <h2 className='reset-subtitle'>Entrez votre Email</h2>
    <p className='reset-note'>**Consultez aussi vos courriers indésirables**</p>
    {message && <p className='reset-message'>{message}</p>}
    {error && <p className='reset-error'>{error}</p>}
    
    <form onSubmit={handleSubmit} className='reset-form'>
      <div className='reset-input'>
        <label htmlFor='email' className='reset-label'>Email</label>
        <input
          placeholder='Email'
          type='email'
          name='email'
          id='email'
          onChange={handleChange}
          value={activation.email}
          required
          className='reset-text-input'
        />
      </div>
      
      <div className='reset-input'>
        <label htmlFor='code' className='reset-label'>Code</label>
        <input
          placeholder='Code'
          type='text'
          name='code'
          id='code'
          onChange={handleChange}
          value={activation.code}
          required
          className='reset-text-input'
        />
      </div>
      
      <div className='reset-input'>
        <label htmlFor='password' className='reset-label'>Mot de Passe</label>
        <input
          placeholder='Mot de passe'
          type='password'
          name='password'
          id='password'
          onChange={handleChange}
          value={activation.password}
          required
          className='reset-text-input'
        />
      </div>
      
      <button type='submit' className='reset-submit-btn'>Envoyer</button>
    </form>
  </div>
  )}

export default NewPassword