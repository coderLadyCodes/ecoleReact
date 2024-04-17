import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import {FaEdit, FaEye, FaTrashAlt} from 'react-icons/fa'

const PostView = () => {
    const {userId} = useParams()
    const [postDTO, setPostDTO] = useState({
        title: '',
        postContent: '',
        localDateTime: new Date(),
        multipartFile: '',
    })

          //   ~~ NOT SURE ABOUT LOCALDATETIME ~~

    const localDateTime =  new Date()
    const ldt = localDateTime.getHours
    + ':' + localDateTime.getMinutes()
    + ':' + localDateTime.getSeconds()

    useEffect(()=> {
        loadPost()
    }, [])

    const loadPost = async () => {
        try {
            const result = await axios.get(`http://localhost:8080/posts/${userId}`)
            setPostDTO(result.data)
        }catch (error){
            console.error('Error: ', error)
        }
    }
  return (
    <section>
     <h2>Contenu de l'article</h2>
      <div>
      <div>
      <div style={{width: '40rem'}}>
     <div>
     <img
        src={`http://localhost:8080/images/${postDTO.userId}/${postDTO.imagePost}`} alt="photo" className="rounded-circle img-fluid"
    style={{ width: 200, height: 200}}/>


        <div>
        <div>
        <div>
 
    <div>
        <p className='text-muted mb-0'>{postDTO.title}</p>
    </div>
    <div>
        <p>{postDTO.postContent}</p>
        <p>{ldt}</p>
    </div>
    </div>

     <button type="button">
        <Link to={`/edit-student/${postDTO.id}`}><FaEdit />Modifier</Link>                                       
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