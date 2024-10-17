import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import {FaEdit, FaEye, FaTrashAlt} from 'react-icons/fa'
import { useAuth } from '../user/AuthProvider'
import './PostView.css'

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
            const result = await axios.get(`${process.env.REACT_APP_API_URL}/posts/post/${id}`, {withCredentials: true})
            setPostDTO(result.data)
        }catch (error){
            console.error('Error: ', error)
        }
    }
  return (
    <section className='post-view'>
            <h2 className='post-view-title'>{postDTO.title}</h2>
            <div className='post-view-content'>
                {postDTO.imagePost && (
                    <img
                        //src={`${process.env.REACT_APP_API_URL}/images/${id}/${postDTO.imagePost}`}
                        src={postDTO.imagePost}
                        alt='photo'
                        className='post-view-image'
                    />
                )}
                <div className='post-view-details'>
                    <p>{postDTO.postContent}</p>
                    <p className='post-view-date'>{postDTO.local_date_time}</p>
                    <button className='post-view-edit-button'>
                        <Link to={`/edit-post/${postDTO.id}`}><FaEdit /> Modifier</Link>
                    </button>
                </div>
            </div>
        </section>
  )
}

export default PostView