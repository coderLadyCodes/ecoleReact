import React, { useState } from 'react'
import { Link, useNavigate} from 'react-router-dom'
import axios from 'axios'

const Connexion = () => {
const navigate = useNavigate()
const [authentificationDTO, setAuthentificationDTO] = useState({
  username:'',
  password:'',
})

const handleInputChange = (e) => {
  const {name, value} = e.target
  setAuthentificationDTO((prvAuthentificationDTO)=>({...prvAuthentificationDTO, [name]: value}))
}

const handleSubmit = async (e) => {
  e.preventDefault()
  if(!authentificationDTO.username || !authentificationDTO.password){
    alert('Completez Tout Les Champs')
    return
  }
  if (!authentificationDTO.password.trim()) {
    alert('Le mot de passe ne peut pas être vide');
    return;
  }

  try {
    const response = await axios.post('http://localhost:8080/connexion', authentificationDTO,{
      headers: {
        'Content-Type': 'application/json',
      },
    })
  console.log(response.data)
  navigate('/dashboard')
} catch (error) {
  console.error('Error:', error);
}
  }

  return (
    <div>
      <h2>Connexion</h2>
      <form onSubmit={handleSubmit} method='post'>
      <div>
            <label htmlFor='username'>Email</label>
            <input placeholder='Email' type='email' name='username' id='username' onChange={handleInputChange} value={authentificationDTO.username} required/>
      </div>
      <div>
            <label htmlFor='password'>Mot de Passe</label>
            <input placeholder='mot de passe' type='password' name='password' id='password' onChange={handleInputChange} value={authentificationDTO.password} required/>
            <p><Link to={'/passwordRefresh'}  type='submit'>Mot de passe oublié?</Link></p>
      </div>
      <div>
              <button type='submit'>Connecter</button>
      </div>
      </form>
    </div>
  )
}

export default Connexion