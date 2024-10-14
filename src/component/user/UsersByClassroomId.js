import React, { useEffect, useLayoutEffect, useState } from 'react'
import axios from 'axios'
import {FaEdit, FaEye, FaTrashAlt} from 'react-icons/fa'
import {Link, useLocation, useNavigate, useParams} from 'react-router-dom'
import { useAuth } from './AuthProvider'
import './UsersByClassroomId.css'

const UsersByClassroomId = () => {
const {role} = useAuth()
const {classroomId} = useParams()
const navigate = useNavigate()
const location = useLocation()
const { teacher } = location.state || {}
const [userDTO, setUserDTO] = useState([])

    useEffect(() =>{
        loadUsers()
    }, [])

    const loadUsers = async () =>{
        try{
        const result = await axios.get(`http://localhost:8080/classroom/${classroomId}/users`,{withCredentials: true})
        
        setUserDTO(result.data)

    } catch (error) {
        console.error("error : ", error)
    }}

    const handleDelete = async(id) => {
      let userChoice = window.confirm('Voulez vous supprimer ce contacte?')
      if(userChoice){
        await axios.delete(`http://localhost:8080/users/${id}`,{withCredentials: true})
        loadUsers()
      }
    }

  return (
    <>
    {role === 'ADMIN' && (
      <section className="users-by-classroom-id">
        <h2>Liste des Parents d'élèves</h2>
        <h3>L'enseignant(e) : {teacher}</h3>

        <table>
          <thead>
            <tr>
              <th>Nom</th>
              <th>Email</th>
              <th>Tél</th>
              <th>Photo</th>
            </tr>
          </thead>
          <tbody>
            {userDTO
              .filter((usr) => usr.name.toLowerCase() && usr.role !== 'SUPER_ADMIN' && usr.role !== 'ADMIN')
              .map((user, index) => (
                <tr
                  key={user.id}
                  onClick={() => navigate(`/user-profile/${user.id}`, { state: { classroomId } })}
                  style={{ cursor: 'pointer' }}
                >
                  <td data-label="Nom">{user.name}</td>
                  <td data-label="Email">{user.email}</td>
                  <td data-label="Tél">{user.phone}</td>
                  <td data-label="Photo">
                    {user.profileImage ? (
                      <img
                        src={`http://localhost:8080/images/${user.id}/${user.profileImage}`}
                        alt="profile"
                        style={{ width: '100px', height: '100px' }}
                      />
                    ) : (
                      <span>No image</span>
                    )}
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </section>
    )}

    {role === 'SUPER_ADMIN' && (
      <section className="users-by-classroom-id">
        <h2>Liste des Parents d'élèves</h2>
        <h3>L'enseignant(e) : {teacher}</h3>

        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>classroomId</th>
              <th>Nom</th>
              <th>Email</th>
              <th>Tél</th>
              <th>Photo</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {userDTO
              .filter((usr) => usr.name.toLowerCase())
              .map((user, index) => (
                <tr
                  key={user.id}
                  onClick={() => navigate(`/user-profile/${user.id}`)}
                  style={{ cursor: 'pointer' }}
                >
                  <td data-label="ID">{index + 1}</td>
                  <td data-label="classroomId">{classroomId}</td>
                  <td data-label="Nom">{user.name}</td>
                  <td data-label="Email">{user.email}</td>
                  <td data-label="Tél">{user.phone}</td>
                  <td data-label="Photo">
                    {user.profileImage ? (
                      <img
                        src={`http://localhost:8080/images/${user.id}/${user.profileImage}`}
                        alt="profile"
                        style={{ width: '100px', height: '100px' }}
                      />
                    ) : (
                      <span>No image</span>
                    )}
                  </td>
                  <td data-label="Actions">
                    {user.role !== 'SUPER_ADMIN' && (
                      <button onClick={() => handleDelete(user.id)}>
                        <FaTrashAlt />
                      </button>
                    )}
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </section>
    )}
  </>
  )
 
}

export default UsersByClassroomId