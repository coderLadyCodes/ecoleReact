import axios from 'axios'
import React, { useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { useAuth } from '../common/AuthProvider'

const AddPost = () => {
    let navigate = useNavigate()
    const {user} = useAuth()
    const [postDTO, setPostDTO] = useState({
        title: '',
        postContent: '',
        local_date_time: '',
    })

    const [file, setFile] = useState(null)
    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0]
        const maxSizeInBytes = 0.5 * 1024 * 1024
    
        if (selectedFile && selectedFile.size > maxSizeInBytes) {
          alert('La taille du fichier excede 500KB, veuillez reduire le volume svp')
          setFile(null)
        } else {
          setFile(selectedFile)
        }
      }

      const handleInputChange = (e) => {
      const {name, value} = e.target
      setPostDTO((pervPostDTO) => ({...pervPostDTO, [name]: value}))
      }

      const handleSubmit = async (e) => {
        e.preventDefault()
        const currentDateTime = new Date().toLocaleString('fr-FR')
        const createdPost = {...postDTO, local_date_time: currentDateTime}
        try {
          const formData = new FormData()
          formData.append('postDTO', JSON.stringify(createdPost))
          formData.append('multipartFile', file)
          const response = await axios.post('http://localhost:8080/posts', formData, {
            headers: {
              'Content-Type': 'multipart/form-data',
            }, withCredentials: true
          })
          if (response.data && response.data.id) {
            const id = response.data.id
            console.log('response data from add post : ', response.data.id)
            navigate(`/post-view/${id}`) 
          }else {
            console.error('Invalid response from server:', response)
            alert('Error: Failed to create student.')
          }
        } catch(error) {
          console.error('Error:', error)
        }
      }
      if (!user) {
        navigate('/connexion')
        return <p>Vous devez etre connecter a votre compte</p>
      }

  return (
    <div>
      <div>
      <div style={{width:'50%'}}>
      <h2>Rédiger un article</h2>
      <form onSubmit={handleSubmit} encType='multipart/form-data' method='post'>

      <div>
     <label htmlFor='title' className='form-label'>Titre</label>
     <input autoComplete="title" type='text' className='form-control' name='title' id='title' required onChange={handleInputChange} value={postDTO.title}/>
      </div>

      <div>
       <label htmlFor='postContent' className='form-label'>Message</label>
       <textarea className='form-control' id='postContent'  name='postContent' required onChange={handleInputChange} value={postDTO.postContent}></textarea>
      </div>

     {/* <div>
       <label htmlFor='localDateTime' className='form-label'>LocalDateTime</label>
       <input className='form-control' id='localDateTime' name='localDateTime' required onChange={handleInputChange} value={new Date()}></input>
      </div>*/}

      <div> 
       <input className='form-control col-sm-6' type='file' name='multipartFile' id='multipartFile' accept='.jpeg, .jpg, .png' onChange={handleFileChange}/>
      </div>
        <p>taille max du fichier : 500KB</p>
      <div>
         <button type='submit'>Save</button>
      </div>
      <div>
          <Link to={'/accueil'}  type='submit'>Cancel</Link> {/* change the link for cancel */}
      </div>
      </form>
            
    </div>
    </div>
    </div>
  )
}

export default AddPost