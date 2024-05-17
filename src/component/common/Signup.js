import axios from 'axios'
import React, { useEffect, useState } from 'react'
import {Link, useNavigate, useParams} from 'react-router-dom'
import profil from '../../images/profil.jpg'

const Signup = () => {
let navigate = useNavigate()
const {userId} = useParams()
const [userDTO, setUserDTO] = useState({
    name: '',
    email: '',
    password: '',
    phone: '',
    role:'PARENT',
  })
  const [confirmPassword, setConfirmPassword] = useState('')

  useEffect(() => {
    if (userId) {
      setUserDTO(prevUserDTO => ({ ...prevUserDTO, userId }))
    } 
  }, [userId])
 

  const [file, setFile] = useState(null)
  const [previewImage, setPreviewImage] = useState(null)

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0]
    const maxSizeInBytes = 0.5 * 1024 * 1024

    if (selectedFile && selectedFile.size > maxSizeInBytes) {
      alert("La taille du fichier excede 500KB, veuillez reduire le volume svp")
      setFile(null)
    } else {
      setFile(selectedFile)
      setPreviewImage(URL.createObjectURL(selectedFile))
    }
  }
  useEffect(() => {
    return () => {
      if (previewImage) {
        URL.revokeObjectURL(previewImage);
      }
    }
  }, [previewImage]);

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setUserDTO((prevUserDTO) => ({ ...prevUserDTO, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if(!userDTO.name || !userDTO.email || !userDTO.phone || !userDTO.password || !confirmPassword)  {
      alert('Completez tout les champs')
      return
    }

    if (!userDTO.password.trim()) {
      alert('Le mot de passe ne peut pas être vide');
      return;
    }

    if (userDTO.password !== confirmPassword){
      alert('Le mot de passe ne correspond pas')
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
  
      const response = await axios.post('http://localhost:8080/signup', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      console.log('response is : ', response)

      const userId = response.data.id
      navigate('/activation')
      
    } catch (error) {
      console.error('Error:', error)
    }
  }

 
  return (
    <div>
        <h2>Inscription</h2>
        <form onSubmit={handleSubmit} encType="multipart/form-data" method='post'>

          <div className='inputs'>

          <div>
          <label htmlFor='multipartFile' className='avatar-input'> 
            {previewImage?<img src={previewImage}  alt='profile image' className='profileImage' /> :<img src={profil} alt='profile image' className='profileImage'/>}
            <input type='file' name='multipartFile' id='multipartFile' accept=".jpeg, .jpg, .png" onChange={handleFileChange} style={{display:'none'}}/>
          </label>
          <p>Telechargez la photo</p>
          </div>

           
          <div>
            <label htmlFor='name'>Nom et Prénom</label>
            <input placeholder='Nom et Prénom' type="text"  name='name' id='name' onChange={handleInputChange} value={userDTO.name} required/>   
          </div>

          <div>
            <label htmlFor='email'>Email</label>
            <input placeholder='Email' type='email' name='email' id='email' onChange={handleInputChange} value={userDTO.email} required/>
          </div>

          <div>
            <label htmlFor='password'>Mot de Passe</label>
            <input placeholder='mot de passe' type='password' name='password' id='password' onChange={handleInputChange} value={userDTO.password}  required/>
          </div>

          <div>
            <label htmlFor='password'>Confirmer le mot de passe</label>
            <input placeholder='Confirmer le mot de passe' type='password' name='password' id='confirmPassword' onChange={(e) => setConfirmPassword(e.target.value)} value={confirmPassword} required/>
          </div>
          
          <div>
            <label htmlFor='phone'>Numéro de Téléphone</label>
            <input placeholder='Téléphone' type='number' name='phone' id='phone' onChange={handleInputChange} value={userDTO.phone} required/>
          </div>

          </div>

        <div>
          <button  type='submit'>Inscription</button>
          Vous avez un compte? <Link to={'/connexion'}  type='submit'>Connectez Vous </Link>
        </div>
        </form>
    </div>
  )
}

export default Signup