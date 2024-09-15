import React, { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom'
import { useAuth } from '../user/AuthProvider'
import axios from 'axios'
import Posts from '../post/Posts'
import ClassroomUpdates from './ClassroomUpdates'
import Chat from '../websocket/Chat'


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
    if (!user) {
      navigate('/connexion')
      return <p>Vous devez etre connecter a votre compte</p>
    }


  return (
    <div>
      <h1>Classe : {classroom.grade}</h1>
      <h2>Bienvenue Dans La Classe de : {classroom.teacher}</h2>
      <Link to={`/chat/${classroomId}`}><h1>Chat</h1></Link> {/*<Chat classroomId={classroomId}/>*/}
      <p>Le Code de la classe : {classroom.classroomCode}</p>
      { role == 'ADMIN' && (<h2><Link to={`/classroom/${classroomId}/users`} state={{ teacher: classroom.teacher}}>Liste des Parents d'élèves</Link></h2>)}
      { role == 'SUPER_ADMIN' && (<h2><Link to={`/classroom/${classroomId}/users`} state={{ teacher: classroom.teacher}}>Liste des Parents d'élèves</Link></h2>)}
      { role == 'ADMIN' && (<h2><Link to={`/classroom/${classroomId}/students`}>Liste Elèves</Link></h2>)}
      { role == 'SUPER_ADMIN' && (<h2><Link to={`/classroom/${classroomId}/students`}>Liste Elèves</Link></h2>)}
      { role == ('ADMIN' || 'SUPER_ADMIN' ) && (<h2><Link to={`/classroom/${classroomId}/add-post`}>Créer un article</Link></h2>)}
      { role == ('ADMIN' || 'SUPER_ADMIN' ) && (<ClassroomUpdates classroomId={classroomId} />)}
      <Posts classroomId={classroomId}/>
     
      
      <p>**User ID** :  {userId}</p>
    </div>
  )
}

export default Classroom