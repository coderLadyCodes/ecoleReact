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
      const results = await axios.get(`${process.env.REACT_APP_API_URL}/posts/classroom/${classroomId}`,{withCredentials: true})
      //const sortedPosts = results.data.sort((a, b) => new Date(b.local_date_time) - new Date(a.local_date_time))
      const sortedPosts = results.data.sort((a,b) => {
        const dateA = parseDate(a.local_date_time)
        const dateB = parseDate(b.local_date_time)
        return dateB - dateA
      })
      setPostDTO(sortedPosts)

    }catch (error) {
      console.error('error : ', error)
  }
  }
  
  const handleDelete = async(id) => {
    let userChoice = window.confirm('Voulez vous supprimer cet article?')
    if(userChoice){
      try{
      await axios.delete(`${process.env.REACT_APP_API_URL}/posts/${id}`, {withCredentials: true})
      loadPosts()
      }catch (error){
         console.error("Error deleting Post:", error)
      }
      
    }
  }

  const parseDate = (dateStr) => {

    const [datePart, timePart] = dateStr.split(' ')
    const [day, month, year] = datePart.split('/')
    return new Date(`${year}-${month}-${day}T${timePart}`)
  }

  return (
    <section className='post-list'>
    <h2 className='post-list-title'>Les Posts</h2>

    {postDTO.map((post) => (
        <div key={post.id} className='post-list-item'>
            <h3 className='post-list-item-title'>{post.title}</h3>
            {post.imagePost ? (
                <img
                    //src={`${process.env.REACT_APP_API_URL}/images/${post.id}/${post.imagePost}`}
                    src={post.imagePost}
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