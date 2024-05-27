import axios from 'axios'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Activation = () => {
    let navigate = useNavigate()
    const [activation, setActivation] = useState({
        code:''
    })
    const handleChange = (e) => {
        const { name, value } = e.target
        setActivation({ ...activation, [name]: value })
    }
    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
        const response = await axios.post('http://localhost:8080/activation', activation,{
            headers: {
              'Content-Type': 'application/json',
            },
          })
        console.log(response.data)
        navigate('/identification')
    } catch (error) {
        console.error('Error:', error);
    }
    }
  return (
    <div>
        <h1>Activer votre compte</h1>
        <h2>Vous allez recevoir un Email avec le code de vérification</h2>
        <p>Consultez aussi vos courriers indésirables :)</p>
        <form onSubmit={handleSubmit}>
        <label htmlFor='code'>Code</label>
            <input placeholder='code' type="text"  name='code' id='code' onChange={handleChange} value={activation.code} required/> 
        <button type='submit'>Activer</button>
        </form>
    </div>
  )
}

export default Activation