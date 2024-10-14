import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { useAuth } from '../user/AuthProvider'
import './EditPost.css'

const EditPost = () => {
  const {id} = useParams()
  const {user} =  useAuth()
  let navigate = useNavigate()
  const [postDetails, setPostDetails] = useState({
    title: '',
    postContent: '',
    classroomId: '',
    local_date_time: '',
})

useEffect(() => {
  loadPost()
}, [id])

const loadPost = async () => {
  try{
    const result = await axios.get(`http://localhost:8080/posts/post/${id}`, { withCredentials: true })
    setPostDetails(result.data)
  }catch (error) {
    console.error('Error loading post details:', error)
  }
}

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
        setPostDetails((pervPostDetails) => ({...pervPostDetails, [name]: value}))
        }

        const updatePost = async (e) => {
          e.preventDefault()
          const currentDateTime = new Date().toLocaleString('fr-FR')
          const modifiedPost = {...postDetails, local_date_time: currentDateTime}

          try {
            const formData = new FormData()
            //formData.append('postDetails', JSON.stringify(modifiedPost))
            //formData.append('multipartFile', file)
            formData.append('postDetails', new Blob([JSON.stringify(modifiedPost)], { type: 'application/json' }))
            if (file) {
              formData.append('multipartFile', file)
             }
            const response = await axios.put(`http://localhost:8080/posts/${id}`, formData, {
              headers: {
                'Content-Type': 'multipart/form-data',
              }, withCredentials: true
            })
            setPostDetails(response.data)
            navigate(`/classroom/${postDetails.classroomId}`)
          } catch(error) {
            console.error('Error:', error)
          }
        }
        if (!user) {
          navigate('/connexion')
          return <p>Vous devez etre connecter a votre compte</p>
        }
  return (
    <div className="edit-post-container">
      <h2 className="edit-post-title">Modifier l'article</h2>
      <form className="edit-post-form" onSubmit={updatePost} encType="multipart/form-data" method="post">
        <div className="edit-post-form-group">
          <label htmlFor="title">Titre</label>
          <input
            autoComplete="title"
            type="text"
            name="title"
            id="title"
            required
            onChange={handleInputChange}
            value={postDetails.title}
          />
        </div>

        <div className="edit-post-form-group">
          <label htmlFor="postContent">Message</label>
          <textarea
            id="postContent"
            name="postContent"
            required
            onChange={handleInputChange}
            value={postDetails.postContent}
          ></textarea>
        </div>

        <div className="edit-post-file-upload">
          <input
            type="file"
            name="multipartFile"
            id="multipartFile"
            accept=".jpeg, .jpg, .png"
            onChange={handleFileChange}
          />
        </div>
        <p className="edit-post-file-size">Taille max du fichier : 500KB</p>

        <div className="edit-post-actions">
          <button type="submit">Sauvegarder</button>
          <Link to={`/classroom/${postDetails.classroomId}`} type="button">Annuler</Link>
        </div>
      </form>
    </div>
  )
}

export default EditPost