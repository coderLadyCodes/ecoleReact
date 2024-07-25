import React, { useEffect, useState } from 'react'
import { useLocation, useParams } from 'react-router-dom'
import { useAuth } from '../user/AuthProvider'
import axios from 'axios'

const Classroom = () => {
  const location = useLocation()
  const {classroomId} = useParams()
    const {userId, user, userName} = useAuth()
    const {classroomCode} = location.state || {}
    const [classroom, setClassroom] = useState({
      grade:'',
      userId: userId || '',
      classroomCode: classroomCode || '',
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
        console.log('result classroom : ', result)
      }catch (error) {
        console.error('Error: ', error)
      }
    }

  return (
    <div>
      <h1>Classe de {classroom.grade}</h1>
      <p>Classroom Code: {classroom.classroomCode}</p>
      <p>User ID: {classroom.userId}</p>
    </div>
  )
}

export default Classroom