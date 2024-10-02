import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'

const EditUserProfileById = () => {
  const { userId } = useParams()
  const navigate = useNavigate()
    const [userDetails, setUserDetails] = useState({
        name: '',
        email: '',
        phone: '',
      })

      useEffect(() => {
        loadUser()
      }, [])
      const loadUser = async () => {
        try{
            const result = await axios.get(`http://localhost:8080/users/${userId}`,{withCredentials: true})
            setUserDetails(result.data)
        }catch (error) {
            console.error('Error fetching user data:', error)
            }
      }       
  const [file, setFile] = useState(null)

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setUserDetails((prevUserDetails) => ({ ...prevUserDetails, [name]: value }))
  }
     
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
      alert("Completez tout les champs")
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
      
      const response = await axios.put(`http://localhost:8080/users/${userId}`,formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        }, withCredentials: true
      })
      setUserDetails(response.data)  
      navigate('/users-view')
    } catch (error) {
      console.error('Error:', error)
    }
}
  return (
    <div>
        <div>
      <div>
      <div>
        <div>
        <div>
  
        <h2>Modifier</h2>
  
        <form onSubmit={updateUser} encType="multipart/form-data" method='post'>
  
          <div>
            <label htmlFor='name'>Nom et Prénom</label>
            <input autoComplete="name" placeholder='Nom et Prénom' type='text' name='name' id='name' onChange={handleInputChange} value={userDetails.name} required/>
          </div>
  
          <div>
            <label htmlFor='email'>Email</label>
            <input autoComplete="email" placeholder='Email' type='email' name='email' id='email' onChange={handleInputChange} value={userDetails.email} required/>
          </div>
  
          <div>
            <label htmlFor='phone'>Numéro de Téléphone</label>
            <input autoComplete="tel" placeholder='Numero de Telephone' type='number' name='phone' id='phone' onChange={handleInputChange} value={userDetails.phone} required/>
          </div>
  
          
          <div>
            <label htmlFor='multipartFile'>Choisir une Photo</label>
            <input type='file' name='multipartFile' id='multipartFile' accept=".jpeg, .jpg, .png" onChange={handleFileChange}/>
          </div>
          <p>taille max du fichier : 500KB</p>
  
          <div>
            <div>
              <button type='submit'>Save</button>
            </div>
            <div>
              <Link to={'/users-view'}  type='submit'>Cancel</Link> 
            </div>
          </div>
        </form>   
      </div>
      </div>
      </div>
      </div>
      </div>
      </div>
  )
}

export default EditUserProfileById