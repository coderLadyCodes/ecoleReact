import React, { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom'
import { useAuth } from '../user/AuthProvider'
import axios from 'axios'
import AddPost from '../post/AddPost'
import Posts from '../post/Posts'

const Classroom = () => {
  let navigate = useNavigate()
  const location = useLocation()
  const {classroomId} = useParams()
    const {userId, role, user, userName} = useAuth()
    const {classroomCode, teacher} = location.state || {}
    const [classroom, setClassroom] = useState({
      grade:'',
      userId: userId || '',
      classroomCode: classroomCode || '',
      teacher: teacher,
    })

    useEffect(() => {
      const classroomId = localStorage.getItem('classroomId')
      if (!classroomId) {
          navigate('/accesscode')
      }
  }, [navigate])

    useEffect(() => {
      loadClassroom()
    }, [classroomId])

    const loadClassroom = async () => {
      try {
        const result = await axios.get(`http://localhost:8080/classroom/${classroomId}`, {withCredentials: true})
        setClassroom(prevState => ({
          ...prevState,
          ...result.data,
      }))

      }catch (error) {
        console.error('Error: ', error)
      }
    }

  return (
    <div>
      <h1>Classe de {classroom.grade}</h1>
      <h2>Bienvenue Dans La Classe de : {classroom.teacher}</h2>
      <p>Le Code de la classe : {classroom.classroomCode}</p>
      { role == 'ADMIN' && (<h2><Link to={`/classroom/${classroomId}/add-post`}>Créer un article</Link></h2>)}
      { role == 'SUPER_ADMIN' && (<h2><Link to={`/classroom/${classroomId}/add-post`}>Créer un article</Link></h2>)}
    
      <Posts />
      <p>**User ID** :  {userId}</p>
    </div>
  )
}

export default Classroom