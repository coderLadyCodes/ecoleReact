import axios from 'axios'
import React, { useEffect, useState } from 'react'
import {Link, useNavigate} from 'react-router-dom'
import profil from '../../images/profil.jpg'
import './Signup.css'

const Signup = () => {
let navigate = useNavigate()
//const {userId} = useParams()
const [userDTO, setUserDTO] = useState({
    name: '',
    email: '',
    password: '',
    phone: '',
  })

  const [confirmPassword, setConfirmPassword] = useState('')
  const [file, setFile] = useState(null)
  const [previewImage, setPreviewImage] = useState(null)

  const [errors, setErrors] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: '',
  })

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0]
    const maxSizeInBytes = 0.5 * 1024 * 1024

    if (selectedFile && selectedFile.size > maxSizeInBytes) {
      alert('La taille du fichier excede 500KB, veuillez reduire le volume svp')
      setFile(null)
    }else if (!selectedFile){
      console.log('Selectionnez une photo')
    } else {
      setFile(selectedFile)
      setPreviewImage(URL.createObjectURL(selectedFile))
    }
  }
  useEffect(() => {
    return () => {
      if (previewImage) {
        URL.revokeObjectURL(previewImage)
      }
    }
  }, [previewImage])

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setUserDTO((prevUserDTO) => ({ ...prevUserDTO, [name]: value }))
    setErrors({...errors, [name] : ''})
  }

  const validateForm = () => {
    let valid = true
    const newErrors = {}

    // Name validation: not empty and more than 4 characters
    if (!userDTO.name || userDTO.name.length < 4) {
      newErrors.name = 'Le nom doit contenir au moins 4 caractères.'
      valid = false
    }

    // Email validation: proper format
    if (!userDTO.email.match(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/)) {
      newErrors.email = 'Adresse email invalide.'
      valid = false
    }

    // Password validation: at least 8 characters
    if (!userDTO.password || userDTO.password.length < 8) {
      newErrors.password = 'Le mot de passe doit contenir au moins 8 caractères.'
      valid = false
    }

    // Confirm password validation: must match password
    if (userDTO.password !== confirmPassword) {
      newErrors.confirmPassword = 'Les mots de passe ne correspondent pas.'
      valid = false
    }

    // Phone validation: must be a valid 10-digit number
    if (!userDTO.phone.match(/^\d{10}$/)) {
      newErrors.phone = 'Le numéro de téléphone doit contenir 10 chiffres.'
      valid = false
    }

    setErrors(newErrors)
    return valid
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    {/*if(!userDTO.name || !userDTO.email || !userDTO.phone || !userDTO.password || !confirmPassword)  {
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
    }*/}

    if (!validateForm()){
      return
    }
         try {
      const formData = new FormData()
      //formData.append('userDTO', JSON.stringify(userDTO))
      //formData.append('multipartFile', file)
      formData.append('userDTO', new Blob([JSON.stringify(userDTO)], { type: 'application/json' }))

      if (file) {
        formData.append('multipartFile', file)
       }
      const response = await axios.post('http://localhost:8080/signup', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      navigate('/activation')
      
    } catch (error) {
      if(error.response && error.response.status === 409){
        alert(error.response.data.error)
      }
      alert('une erreur est survenue, veillez réesayer.')
      console.error('Error:', error)
    }
  }

 
  return (
  <div className='signup-container'>
  <h2 className='signup-title'>Inscription</h2>
  <form className='signup-form' onSubmit={handleSubmit} encType='multipart/form-data' method='post'>
    <div className='signup-inputs'>

      <div className='signup-avatar'>
        <label htmlFor='multipartFile' className='signup-avatar-input'> 
          {previewImage ? <img src={previewImage} alt='profile image' /> 
                        : <img src={profil} alt='profile image' className='signup-profileImage' />}
          <input type='file' name='multipartFile' id='multipartFile' accept='.jpeg, .jpg, .png' onChange={handleFileChange} style={{display: 'none'}} />
        </label>
        <p className='signup-avatar-text'>Téléchargez la photo</p>
      </div>

      <div className='signup-input-field'>
        <label htmlFor='name'>Nom et Prénom</label>
        <input placeholder='Nom et Prénom' type='text' name='name' id='name' onChange={handleInputChange} value={userDTO.name} required />
        {errors.name && <span className='signup-error'>{errors.name}</span>}
      </div>

      <div className='signup-input-field'>
        <label htmlFor='email'>Email</label>
        <input placeholder='Email' type='email' name='email' id='email' onChange={handleInputChange} value={userDTO.email} required />
        {errors.email && <span className='signup-error'>{errors.email}</span>}
      </div>

      <div className='signup-input-field'>
        <label htmlFor='password'>Mot de Passe</label>
        <input placeholder='mot de passe' type='password' name='password' id='password' onChange={handleInputChange} value={userDTO.password} required />
        {errors.password && <span className='signup-error'>{errors.password}</span>}
      </div>

      <div className='signup-input-field'>
        <label htmlFor='confirmPassword'>Confirmer le mot de passe</label>
        <input placeholder='Confirmer le mot de passe' type='password' name='password' id='confirmPassword' onChange={(e) => setConfirmPassword(e.target.value)} value={confirmPassword} required />
        {errors.confirmPassword && <span className='signup-error'>{errors.confirmPassword}</span>}
      </div>

      <div className='signup-input-field'>
        <label htmlFor='phone'>Numéro de Téléphone</label>
        <input placeholder='Téléphone' type='number' name='phone' id='phone' onChange={handleInputChange} value={userDTO.phone} required />
        {errors.phone && <span className='signup-error'>{errors.phone}</span>}
      </div>

    </div>

    <div className='signup-footer'>
      <button className='signup-submit' type='submit'>Inscription</button>
      <p className='signup-link'>
        Vous avez un compte? <Link to='/connexion'>Connectez Vous</Link>
      </p>
    </div>
  </form>
</div>

  )
}

export default Signup