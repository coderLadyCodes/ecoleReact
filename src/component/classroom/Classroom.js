import React, { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom'
import { useAuth } from '../user/AuthProvider'
import axios from 'axios'
import Posts from '../post/Posts'
import ClassroomUpdates from './ClassroomUpdates'
import './Classroom.css'


const Classroom = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const {classroomCode, teacher} = location.state || {}
  const {classroomId} = useParams()
  const {userId, role, user, userName} = useAuth()   
  const [classroom, setClassroom] = useState({
      grade:'',
      userId: userId || '',
      classroomCode: classroomCode || '',
      teacher: teacher,
    })
    const [users, setUsers] = useState([])

    useEffect(() => {
      loadClassroom()
      loadUsers()
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
    
  
  const loadUsers = async () => { 
    if (role === 'ADMIN' || role === 'SUPER_ADMIN'){
    try {
      const result = await axios.get(`http://localhost:8080/classroom/${classroomId}/users`, { withCredentials: true })
      setUsers(result.data)  
    }catch (error) {
      console.error('Error fetching users: ', error)
    }
    
  }}

    if (!user) {
      navigate('/connexion')
      return <p>Vous devez etre connecter a votre compte</p>
    }


  return (
    <div className='classroom-container'>
      <div className='classroom-nav'>
        <Link to={`/chat/${classroomId}`} state={{users}}>Chat</Link>
        {role === 'ADMIN' || role === 'SUPER_ADMIN' ? (
          <Link to={`/classroom/${classroomId}/users`} state={{ teacher: classroom.teacher }}>
            Liste des Parents d'élèves
          </Link>
        ) : null}
        {(role === 'ADMIN' || role === 'SUPER_ADMIN') && (
          <>
            <Link to={`/classroom/${classroomId}/students`}>Liste des élèves</Link>
            <Link to={`/classroom/${classroomId}/add-post`}>Créer un article</Link>
          </>
        )}
      </div>

      <div className='classroom-info'>
        <h1>Classe : {classroom.grade}</h1>
        <h2>Bienvenue Dans La Classe de : {classroom.teacher}</h2>
        <p>Le Code de la classe : <b>{classroom.classroomCode}</b></p>
      </div>

      {role === 'ADMIN' || role === 'SUPER_ADMIN' ? (
        <ClassroomUpdates classroomId={classroomId} />
      ) : null}

      <div className='classroom-posts'>
        <Posts classroomId={classroomId} />
      </div>
    </div> 
  )
}
   
    
 

export default Classroom