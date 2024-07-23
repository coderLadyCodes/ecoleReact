import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import { useAuth } from '../user/AuthProvider'

const Classroom = () => {
    const {id} = useParams()
    const {userId, user, userName} = useAuth()
    const [classroom, setClassroom] = useState({
      grade:'',
      userId:userId,
      classroomCode:'',
    })
  return (
    <div>
      <h1>Classe de {userName}</h1>
    </div>
  )
}

export default Classroom