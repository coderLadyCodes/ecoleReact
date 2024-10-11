import axios from 'axios'
import React, { useEffect, useState } from 'react'
import {FaEdit, FaEye, FaTrashAlt} from 'react-icons/fa'
import { useAuth } from '../user/AuthProvider'
import { Link, useParams } from 'react-router-dom'
import './Posts.css'

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
      console.log(results.data)
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
    <section className='post-list'>
    <h2 className='post-list-title'>Les Posts</h2>

    {postDTO.map((post) => (
        <div key={post.id} className='post-list-item'>
            <h3 className='post-list-item-title'>{post.title}</h3>
            {post.imagePost ? (
                <img
                    src={`http://localhost:8080/images/${post.id}/${post.imagePost}`}
                    alt='post image content'
                    className='post-list-item-image'
                />
            ) : (
                <span></span>
            )}
            <p className='post-list-item-content'>{post.postContent}</p>
            <p className='post-list-item-date'>
                <small>{post.local_date_time}</small>
            </p>
            <div className='post-list-item-actions'>
                {(role === 'ADMIN' || role === 'SUPER_ADMIN') && (
                    <>
                        <Link to={`/edit-post/${post.id}`} className='post-list-item-edit'>
                            <FaEdit />
                        </Link>
                        <button onClick={() => handleDelete(post.id)} className='post-list-item-delete'>
                            <FaTrashAlt />
                        </button>
                    </>
                )}
            </div>
        </div>
    ))}
</section>
  )
}

export default Posts