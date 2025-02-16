import React, { useEffect, useState } from 'react'
import { useAuth } from '../user/AuthProvider'
import axios from 'axios'
import {FaEdit, FaEye, FaTrashAlt} from 'react-icons/fa'
import { Link, useNavigate } from 'react-router-dom'

const Classrooms = () => {
  const navigate = useNavigate()
  const {role, user, userId, userName} = useAuth()
  const [classroom, setClassroom] = useState([])
   useEffect(() => {
    loadRooms()
   }, [])

   const loadRooms =  async () => {
    try{
      const result = await axios.get(`${process.env.REACT_APP_API_URL}/classroom`,{withCredentials: true})
      setClassroom(result.data)
    }catch (error) {
      console.error("error : ", error)
  }}
  const handleDelete = async(id) => {
    let userChoice = window.confirm('Voulez vous supprimer cette Classe ?')
    if (userChoice){
      try {
        await axios.delete(`${process.env.REACT_APP_API_URL}/classroom/${id}`,{withCredentials: true})
        loadRooms()
      } catch (error){
         console.error("Error deleting classroom:", error)
      }   
    }
}
if (!user) {
  navigate('/connexion')
  return <p>Vous devez etre connecter a votre compte</p>
}
  return (
    <>
    { role === 'SUPER_ADMIN' && (
    <section>
    <h2>Liste des Eleves</h2>
    <table>
      <thead>
        <tr>
            <th>ID</th>   {/* !delete*/ }
            <th>Grade</th>
            <th>La maitresse/le maitre</th>
            <th>le code d'accés</th>
            <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {classroom.map((classroom, index)=>(
         <tr key={classroom.id}>
           <th scope='row' key={index}>{index + 1}</th>
           <td>{classroom.grade}</td>
           <td>{classroom.teacher}</td>
           <td>{classroom.classroomCode}</td>
         <td>
         <Link to={`/classroom/${classroom.id}`}><FaEye /></Link>
         </td>
         <td>
         <Link to={`/edit-classroom/${classroom.id}`}><FaEdit /></Link>
         </td>
          <td>
         <button onClick={()=> handleDelete(classroom.id)}><FaTrashAlt /></button>
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

export default Classrooms
