import React, { useEffect, useState } from 'react'
import {FaEdit, FaEye} from 'react-icons/fa'
import { useAuth } from '../user/AuthProvider'
import axios from 'axios'
import { Link, useParams } from 'react-router-dom'

const StudentsByClassroom = () => {
    const {role} = useAuth()
    const {classroomId} =  useParams()
    const[studentDTO, setStudentDTO] = useState([])

    useEffect(() => {
        loadStudentsByClassroom()
    }, [])

    const loadStudentsByClassroom = async () => {
        try{
            const result = await axios.get(`http://localhost:8080/students/classroom/${classroomId}`, { withCredentials: true })
            setStudentDTO(result.data)

        } catch(error) {
            console.error("Error:", error)
        }
    }
  return (
    <section>
    <h2>Les Eleves</h2>
    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>Nom et Prénom</th>
          <th>Date de naissance</th>
          <th>Présence</th>
          <th>Cantine</th>
          <th>Photo</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {studentDTO.map((student, index) => (
          <tr key={student.id}>
            <th scope='row'>{index + 1}</th>
            <td>{student.name}</td>
            <td>{student.birthday}</td>
            <td>{student.presence.toString()}</td>
            <td>{student.cantine.toString()}</td>
            <td>
              {student.profileImage ? (
                <img
                  src={`http://localhost:8080/images/${student.id}/${student.profileImage}`}
                  alt="profile image"
                  style={{ width: '100px', height: '100px' }}
                />
              ) : (
                <span>No image</span>
              )}
            </td>
            <td>
              <Link to={`/student-profile/${student.id}`}><FaEye /></Link>
            </td>
            <td>
              <Link to={`/edit-student/${student.id}`}><FaEdit /></Link>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </section>
  )
}

export default StudentsByClassroom