import axios from 'axios'
import {Link} from 'react-router-dom'
import {FaEdit, FaEye, FaTrashAlt} from 'react-icons/fa'
import React, { useEffect, useState } from 'react'
import { useAuth } from '../user/AuthProvider'

const StudentsView = () => {
const {role} = useAuth()
const [studentDTO, setStudentDTO] = useState([])

useEffect(() => {
    loadStudents()
},[])

const loadStudents = async () =>{
    try{
        const result = await axios.get(`${process.env.REACT_APP_API_URL}/students`,{withCredentials: true})
        setStudentDTO(result.data)
    } catch (error) {
        console.error('error : ', error)
    }}

const handleDelete = async(id) => {
    let studentChoice = window.confirm('Voulez vous supprimer cet Elève ?')
    if (studentChoice){
      try {
        await axios.delete(`${process.env.REACT_APP_API_URL}/students/${id}`,{withCredentials: true})
        loadStudents()
      } catch (error){
         console.error("Error deleting student:", error)
      }   
    }
}

  return (
    <section>
    <h2>Liste des Eleves</h2>
    <table>
      <thead>
        <tr>
            <th>ID</th>
            <th>Nom et Prénom</th>
            <th>Date de naissance</th>
            <th>classe</th>
            <th>Photo</th>
            <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {studentDTO.filter((student) => student.name.toLowerCase())
        .map((student, index)=>(
         <tr key={student.id}>
           <th scope='row' key={index}>{index + 1}</th>
           <td>{student.name}</td>
           <td>{student.birthday}</td>
           <td>{student.grade}</td>
           <td>{student.profileImage ? (
            <img
            //src={`${process.env.REACT_APP_API_URL}/images/${student.id}/${student.profileImage}`}
            src={student.profileImage}
            alt="profile image"
            style={{ width: '100px', height: '100px' }}
            />
            ) : (
            <span>No Image</span>
            )}</td>
         <td>
         <Link to={`/student-profile/${student.id}`}><FaEye /></Link>
         </td>
         <td>
         <Link to={`/edit-student/${student.id}`}><FaEdit /></Link>
         </td>
          <td>
         <button onClick={()=> handleDelete(student.id)}><FaTrashAlt /></button>
         </td>      
        </tr>
        ))}
      </tbody>  
    </table>
    </section>
  )
}

export default StudentsView

