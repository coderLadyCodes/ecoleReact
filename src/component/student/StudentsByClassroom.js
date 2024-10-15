import React, { useEffect, useState } from 'react'
import {FaEdit, FaEye} from 'react-icons/fa'
import { useAuth } from '../user/AuthProvider'
import axios from 'axios'
import { Link, useNavigate, useParams } from 'react-router-dom'
import './StudentsByClassroom.css'

const StudentsByClassroom = () => {
  const navigate = useNavigate()
    const {role} = useAuth()
    const {classroomId} =  useParams()
    const[studentDTO, setStudentDTO] = useState([])

    useEffect(() => {
        loadStudentsByClassroom()
    }, [])

    const loadStudentsByClassroom = async () => {
        try{
            const result = await axios.get(`${process.env.REACT_APP_API_URL}/students/classroom/${classroomId}`, { withCredentials: true })
            setStudentDTO(result.data)

        } catch(error) {
            console.error("Error:", error)
        }
    }
  return (
    <section className='students-by-classroom'>
      <h2>Les Eleves</h2>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nom et Prénom</th>
            <th>Date de naissance</th>
            <th>Classe</th>
            <th>Photo</th>
          </tr>
        </thead>
        <tbody>
          {studentDTO.map((student, index) => (
            <tr key={student.id} onClick={() => navigate(`/classroom/${classroomId}/student/${student.id}`)} style={{ cursor: 'pointer' }}>
              <th scope='row' data-label="ID">{index + 1}</th>
              <td data-label="Nom et Prénom">{student.name}</td>
              <td data-label="Date de naissance">{student.birthday}</td>
              <td data-label="Classe">{student.grade}</td>
              <td data-label="Photo">
                {student.profileImage ? (
                  <img
                    src={`${process.env.REACT_APP_API_URL}/images/${student.id}/${student.profileImage}`}
                    alt="profile image"
                    className='student-photo'
                  />
                ) : (
                  <span>No Image</span>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  )
}

export default StudentsByClassroom