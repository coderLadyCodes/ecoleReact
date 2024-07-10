import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import {FaEdit, FaEye, FaTrashAlt} from 'react-icons/fa'
import { useAuth } from '../common/AuthProvider'

const PostView = () => {
    const {id} = useParams()
    const {user} = useAuth()
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
            const result = await axios.get(`http://localhost:8080/posts/post/${id}`)
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
      <div style={{width: '40rem'}}>
     <div>
     <img
        src={`http://localhost:8080/images/${postDTO.id}/${postDTO.imagePost}`} alt="photo"
        style={{ width: 200, height: 200}}/>

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