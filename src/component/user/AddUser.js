{/*import React, { useEffect, useState } from 'react'
import {Link, useNavigate, useParams} from 'react-router-dom'
import axios from 'axios'

const AddUser = () => {
  let navigate = useNavigate()
  const {userId} = useParams()

  const [userDTO, setUserDTO] = useState({
    name: '',
    email: '',
    phone: '',
  })
  useEffect(() => {
    if (userId) {
      setUserDTO(prevUserDTO => ({ ...prevUserDTO, userId }))
    } 
  }, [userId])
 

  const [file, setFile] = useState(null)

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

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setUserDTO((prevUserDTO) => ({ ...prevUserDTO, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if(!userDTO.name || !userDTO.email || !userDTO.phone) {
      alert("Completez tout les champs")
      return
    }
    if (!userDTO.email.match(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/)) {
      alert('Adresse mail invalide')
      return
    }
    if (!userDTO.phone.match(/^\d{10}$/)) {
      alert('Please enter a valid phone number')
      return
    }
         try {
      const formData = new FormData()
      formData.append('userDTO', JSON.stringify(userDTO))
      formData.append('multipartFile', file)
      const response = await axios.post('http://localhost:8080/users', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      const userId = response.data.id
      navigate(`/view-user/${userId}`)
      
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
    
        <h2>Ajouter un Parent</h2>
  
        <form onSubmit={handleSubmit} encType="multipart/form-data" method='post'>
  
          <div>
            <label className='input-group-text' htmlFor='name'>Nom et Prénom</label>
            <input autoComplete="name" className='form-control col-sm-6' type='text' name='name' id='name' onChange={handleInputChange} value={userDTO.name} required/>
          </div>
  
          <div>
            <label className='input-group-text' htmlFor='email'>Email</label>
            <input autoComplete="email" className='form-control col-sm-6' type='email' name='email' id='email' onChange={handleInputChange} value={userDTO.email} required/>
          </div>
  
          <div>
            <label htmlFor='phone'>Numéro de Téléphone</label>
            <input autoComplete="tel" className='form-control col-sm-6' type='number' name='phone' id='phone' onChange={handleInputChange} value={userDTO.phone} required/>
          </div>
          
          <div>
 
            <input type='file' name='multipartFile' id='multipartFile' accept=".jpeg, .jpg, .png" onChange={handleFileChange}/>
          </div>
          <p>taille max du fichier : 500KB</p>
  
          <div>
            <div>
              <button type='submit'>Save</button>
            </div>
            <div>
              <Link to={`/view-user/${userId}`}  type='submit'>Cancel</Link>
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
  
export default AddUser*/}