import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import {FaEdit, FaEye, FaTrashAlt} from 'react-icons/fa'
import { useAuth } from '../user/AuthProvider'

const PostView = () => {
    const {id} = useParams()
    const {user, userId} = useAuth()
    const navigate = useNavigate()
    const [postDTO, setPostDTO] = useState({
        title: '',
        postContent: '',
        local_date_time: '',
        multipartFile: '',
    })

    useEffect(()=> {
        if (!user) {
            navigate('/connexion')
        }
        loadPost()
    }, [user, id])

    const loadPost = async () => {
        try {
            const result = await axios.get(`http://localhost:8080/posts/post/${id}`, {withCredentials: true})
            setPostDTO(result.data)
        }catch (error){
            console.error('Error: ', error)
        }
    }
  return (
    <section>
     <h2>{postDTO.title}</h2>
      <div>
      <div>
      <div style={{width: '20rem', height:'40rem'}}>
     <div>
     {postDTO.imagePost?<img
         src={`http://localhost:8080/images/${id}/${postDTO.imagePost}`} alt="photo"
        style={{ width: '16rem', height: '20rem'}}/> : <></> }

        <div>
        <div>
        <div>
 
    <div>
    </div>
    <div>
        <p>{postDTO.postContent}</p>
        {postDTO.local_date_time}
    </div>
    </div>

     <button type="button">
        <Link to={`/edit-post/${postDTO.id}`}><FaEdit />Modifier</Link>                                       
     </button>

    </div> 
    </div>
    </div>
   </div>
   </div>
  </div>
  </section>
  )
}

export default PostView