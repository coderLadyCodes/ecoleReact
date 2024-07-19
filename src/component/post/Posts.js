import axios from 'axios'
import React, { useEffect, useState } from 'react'
import {FaEdit, FaEye, FaTrashAlt} from 'react-icons/fa'
import { useAuth } from '../user/AuthProvider'
import { Link } from 'react-router-dom'

const Posts = () => {
  const {role, userId, user} = useAuth()
  const [postDTO, setPostDTO] = useState([])

  useEffect(() => {
    loadPosts()
  }, [])

  const loadPosts = async () => {
   
    try{
      const results = await axios.get(`http://localhost:8080/posts/user/${userId}`,{withCredentials: true})
      setPostDTO(results.data)
    }catch (error) {
      console.error("error : ", error)
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
      <table>
          <thead>
             <tr>
              <th>ID</th>
              <th>Titre</th>
              <th>Contenu du Poste</th>
              <th>Date</th>
              <th>Image</th>
              <th>Actions</th>
             </tr>
          </thead>

          <tbody>
              {postDTO.map((post, index)=>(
               <tr key={post.id}>
                  <th scope="row" key={index}>
                      {index + 1}
                  </th>
                   <td>{post.title}</td>
                   <td>{post.postContent}</td>
                   <td>{post.local_date_time}</td>
                   <td> {post.imagePost ? (
                        <img
                        src={`http://localhost:8080/images/${post.id}/${post.imagePost}`}
                        alt='post image content'
                        style={{ width: '100px', height: '100px' }}
                        />
                          ) : (
                                <span>No image</span>
                          )}
                   </td>
                   <td>
                      <Link to={`/post-view/${post.id}`}><FaEye /></Link>
                   </td>
                   <td>
                    { role == 'ADMIN' && (
                      <Link to={`/edit-post/${post.id}`}><FaEdit /></Link>
                    )}  
                   </td>
                   <td>
                      { role == 'ADMIN' && (
                        <button onClick={()=> handleDelete(post.id)}><FaTrashAlt /></button>
                      )}
                    </td> 
                    <td>
                    { role == 'SUPER_ADMIN' && (
                      <Link to={`/edit-post/${post.id}`}><FaEdit /></Link>
                    )}  
                   </td>
                   <td>
                      { role == 'SUPER_ADMIN' && (
                        <button onClick={()=> handleDelete(post.id)}><FaTrashAlt /></button>
                      )}
                    </td>
               </tr>
              ))}
          </tbody>
      </table>
      </section>
    </>
  )
}

export default Posts