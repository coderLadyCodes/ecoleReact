import axios from 'axios'
import React, { useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'

const AddPost = () => {
    let navigate = useNavigate()
    const {userId} = useParams()
    const [postDTO, setPostDTO] = useState({
        title: '',
        postContent: '',
        localDateTime: new Date(),
        userId:userId,
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
        
        try {
          const formData = new FormData()
          formData.append('postDTO', JSON.stringify(postDTO))
          formData.append('multipartFile', file)
          const response = await axios.post('http://localhost:8080/posts', formData, {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          })
          navigate(`/post-view/${userId}`) 
        } catch(error) {
          console.error('Error:', error)
        }
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
       <textarea className='form-control' id='postContent' rows='8' name='postContent' required onChange={handleInputChange} value={postDTO.postContent}></textarea>
      </div>

      <div> 
       <input className='form-control col-sm-6' type='file' name='multipartFile' id='multipartFile' accept='.jpeg, .jpg, .png' onChange={handleFileChange} required/>
      </div>
        <p>taille max du fichier : 500KB</p>
      </form>
      <div>
            <div>
              <button type='submit'>Save</button>
            </div>
            <div>
              <Link to={'/'}  type='submit'>Cancel</Link> {/* change the link for cancel */}
            </div>
          </div>
    </div>
    </div>
    </div>
  )
}

export default AddPost