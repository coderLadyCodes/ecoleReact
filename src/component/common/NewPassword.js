import axios from 'axios'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'


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
    <div>
    <h1>Réinitialisez votre mot de passe</h1>
    <h2>Entrez votre Email</h2>
    <p>**Consultez aussi vos courriers indésirables**</p>
    {message && <p>{message}</p>}
    {error && <p>{error}</p>}
    <form onSubmit={handleSubmit}>
    <div>
    <label htmlFor='email'>Email</label>
        <input placeholder='email' type='email'  name='email' id='email' onChange={handleChange} value={activation.email} required/> 
    </div>    
    <div>
        <label htmlFor='code'>Code</label>
        <input placeholder='code' type='text'  name='code' id='code' onChange={handleChange} value={activation.code} required/> 
    </div>
         
    <div>
        <label htmlFor='password'>Mot de Passe</label>
        <input placeholder='mot de passe' type='password'  name='password' id='password' onChange={handleChange} value={activation.password} required/>
    </div>
    <button type='submit'>Envoyer</button>
    </form>
</div>
  )}

export default NewPassword