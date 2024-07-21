import React from 'react'
import { useParams } from 'react-router-dom'

const Classroom = () => {
    const {id} = useParams()
  return (
    <div>Classroom</div>
  )
}

export default Classroom