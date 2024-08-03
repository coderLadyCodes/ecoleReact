import axios from 'axios'
import React, { useEffect, useState } from 'react'
import {FaEdit, FaEye, FaTrashAlt} from 'react-icons/fa'
import { useAuth } from '../user/AuthProvider'
import { Link, useParams } from 'react-router-dom'

const Posts = () => {
  const {classroomId} = useParams()
  const {role, userId, user} = useAuth()
  const [postDTO, setPostDTO] = useState([])

  useEffect(() => {
    loadPosts()
  }, [])

  const loadPosts = async () => {
   
    try{
      const results = await axios.get(`http://localhost:8080/posts/classroom/${classroomId}`,{withCredentials: true})
      const sortedPosts = results.data.sort((a, b) => new Date(b.local_date_time) - new Date(a.local_date_time))
      setPostDTO(sortedPosts)

    }catch (error) {
      console.error('error : ', error)
  }
  }
  
  const handleDelete = async(id) => {
    let userChoice = window.confirm('Voulez vous supprimer cet article?')
    if(userChoice){
      try{
      await axios.delete(`http://localhost:8080/posts/${id}`, {withCredentials: true})
      loadPosts()
      }catch (error){
         console.error("Error deleting Post:", error)
      }
      
    }
  }
  return (
    <>
      <section>

        <h2>Liste des Posts</h2>
      
        {postDTO.map((post) => (

          <div key={post.id} style={{ border: '1px solid #ccc', padding: '1.2rem', marginBottom: '1.2rem' }}>
            <h3>{post.title}</h3>
            {post.imagePost ? (
              <img
                src={`http://localhost:8080/images/${post.id}/${post.imagePost}`}
                alt='post image content'
                style={{ width: '10rem', height: 'auto' }}
              />
            ) : (
              <span>No image</span>
            )}
            <p>{post.postContent}</p>
            <p><small>{post.local_date_time}</small></p>
            <div>
              {role === 'ADMIN' && (
                <>
                  <Link to={`/edit-post/${post.id}`} style={{ marginRight: '10px' }}><FaEdit /></Link>
                  <button onClick={() => handleDelete(post.id)} style={{ background: 'none', border: 'none', cursor: 'pointer' }}><FaTrashAlt /></button>
                </>
              )}
              {role === 'SUPER_ADMIN' && (
                <>
                  <Link to={`/edit-post/${post.id}`} style={{ marginRight: '10px' }}><FaEdit /></Link>
                  <button onClick={() => handleDelete(post.id)} style={{ background: 'none', border: 'none', cursor: 'pointer' }}><FaTrashAlt /></button>
                </>
              )}
            </div>
          </div>
        ))}
      </section>
    </>
  )
}

export default Posts