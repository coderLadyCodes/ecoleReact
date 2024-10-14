import React, { useEffect, useState } from 'react'
import {FaEdit, FaExternalLinkAlt, FaEye, FaTrashAlt} from 'react-icons/fa'
import { useAuth } from '../user/AuthProvider'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'
import './KidsParent.css'

const KidsParent = ({ onSelectKid }) => {
    const {role, userId} = useAuth()
    const [studentDTO, setStudentDTO] = useState([])
    const navigate = useNavigate()
    useEffect(() => {
        if(role == 'PARENT') {
            loadParentStudents()
        }
    }, [role])

    const loadParentStudents =  async () => {
        try {
            const result = await axios.get(`http://localhost:8080/students/user/${userId}`, { withCredentials: true })
            setStudentDTO(result.data)
        } catch (error) {
        console.error("Error:", error)
      }
    } 

    const handleKidSelect = (kidId) => {
      if (onSelectKid){
        onSelectKid(kidId)
      } else {
        navigate(`/student-profile/${kidId}`)
      }   
  }

  return (
    <section className="kids-parent-container">
      <h2 className="kids-parent-title">Mes Enfants</h2>
      <table className="kids-parent-table">
        <thead>
          <tr>
            {onSelectKid && <th className="kids-parent-radio">Sélectionner</th>}
            <th>ID</th>
            <th>Nom et Prénom</th>
            <th>Date de Naissance</th>
            <th>Classe</th>
            <th>Photo</th>
          </tr>
        </thead>
        <tbody>
          {studentDTO.map((student, index) => (
            <tr
              key={student.id}
              onClick={() => !onSelectKid && handleKidSelect(student.id)}
              style={{ cursor: onSelectKid ? 'default' : 'pointer' }}
            >
              {onSelectKid && (
                <td className="kids-parent-radio">
                  <input
                    type="radio"
                    name="selectedKid"
                    value={student.id}
                    onChange={() => handleKidSelect(student.id)}
                  />
                </td>
              )}
              <th scope="row">{index + 1}</th>
              <td>{student.name}</td>
              <td>{student.birthday}</td>
              <td>{student.grade}</td>
              <td>
                {student.profileImage ? (
                  <img
                    src={`http://localhost:8080/images/${student.id}/${student.profileImage}`}
                    alt="profile image"
                    className="kids-parent-img"
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

export default KidsParent