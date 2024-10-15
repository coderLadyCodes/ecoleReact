import React, { useEffect, useState } from 'react'
import {Link, useNavigate} from 'react-router-dom'
import axios from 'axios'
import { useAuth } from './AuthProvider'
import './EditUser.css'

const EditUser = () => {

  let navigate = useNavigate()
  const {userId} = useAuth()
  const [userDetails, setUserDetails] = useState({
    name: '',
    email: '',
    phone: '',
  })

  useEffect(() =>{
    loadUser()
}, [])

const loadUser = async () =>{
  const result = await axios.get(`${process.env.REACT_APP_API_URL}/users/${userId}`,{withCredentials: true})
  setUserDetails(result.data)   
}

  const [file, setFile] = useState(null)

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setUserDetails((prevUserDetails) => ({ ...prevUserDetails, [name]: value }))
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0]
    const maxSizeInBytes = 0.5 * 1024 * 1024

    if (selectedFile && selectedFile.size > maxSizeInBytes) {
      alert("La taille du fichier excede 500KB, veuillez reduire le volume svp")
      setFile(null)
     
    } else {
      setFile(selectedFile)
    }
  }

  const updateUser = async (e) => {
    e.preventDefault()

    if(!userDetails.name || !userDetails.email || !userDetails.phone) {
      alert("Completez tout les champs");
      return
    }
    if (!userDetails.email.match(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/)) {
      alert('Adresse mail invalide')
      return
    }
    if (!userDetails.phone.match(/^\d{10}$/)) {
      alert('Please enter a valid phone number')
      return

    }try {
      const formData = new FormData()
      formData.append('userDetails', JSON.stringify(userDetails))
      formData.append('multipartFile', file)
      
      const response = await axios.put(`${process.env.REACT_APP_API_URL}/users/${userId}`,formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        }, withCredentials: true
      })

      setUserDetails(response.data)  
      navigate('/dashboard')

    } catch (error) {
      console.error('Error:', error)
    }
  }

    return (
      <div className="edit-user-container">
      <h2 className="edit-user-title">Modifier</h2>

      <form className="edit-user-form" onSubmit={updateUser} encType="multipart/form-data" method="post">
        <div className="edit-user-form-group">
          <label htmlFor="name">Nom et Prénom</label>
          <input
            autoComplete="name"
            placeholder="Nom et Prénom"
            type="text"
            name="name"
            id="name"
            onChange={handleInputChange}
            value={userDetails.name}
            required
          />
        </div>

        <div className="edit-user-form-group">
          <label htmlFor="email">Email</label>
          <input
            autoComplete="email"
            placeholder="Email"
            type="email"
            name="email"
            id="email"
            onChange={handleInputChange}
            value={userDetails.email}
            required
          />
        </div>

        <div className="edit-user-form-group">
          <label htmlFor="phone">Numéro de Téléphone</label>
          <input
            autoComplete="tel"
            placeholder="Numéro de Téléphone"
            type="number"
            name="phone"
            id="phone"
            onChange={handleInputChange}
            value={userDetails.phone}
            required
          />
        </div>

        <div className="edit-user-file-upload">
          <label htmlFor="multipartFile">Choisir une Photo</label>
          <input
            type="file"
            name="multipartFile"
            id="multipartFile"
            accept=".jpeg, .jpg, .png"
            onChange={handleFileChange}
          />
        </div>

        <p className="edit-user-file-size">Taille max du fichier : 500KB</p>

        <div className="edit-user-actions">
          <button type="submit">Sauvegarder</button>
          <Link to="/dashboard">Annuler</Link>
        </div>
      </form>
    </div>
    )
  }
  
  export default EditUser