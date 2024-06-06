import axios from 'axios'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

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
    <div>
    <h1>Réinitialisez votre mot de passe</h1>
    <h2>Entrez votre Email</h2>
    <p>**Consultez aussi vos courriers indésirables**</p>
    {message && <p>{message}</p>}
    {error && <p>{error}</p>}
    <form onSubmit={handleSubmit}>
    <label htmlFor='email'>Email</label>
        <input placeholder='email' type="email"  name='email' id='email' onChange={handleChange} value={activation.email} required/> 
    <button type='submit'>Envoyer</button>
    </form>
</div>
  )
}

export default ChangePassword