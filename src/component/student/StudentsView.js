import axios from 'axios'
import {Link} from 'react-router-dom'
import {FaEdit, FaEye, FaTrashAlt} from 'react-icons/fa'
import React, { useEffect, useState } from 'react'

const StudentsView = () => {
const [studentDTO, setStudentDTO] = useState([])

useEffect(() => {
    loadStudents()
},[])

const loadStudents = async () =>{
    try{
        const result = await axios.get('http://localhost:8080/students')
        setStudentDTO(result.data)
    } catch (error) {
        console.error("error : ", error)
    }}

const handleDelete = async(id) => {
    let studentChoice = window.confirm('Voulez vous supprimer cet Elève ?')
    if (studentChoice){
        await axios.delete(`http://localhost:8080/students/${id}`)
        loadStudents()
    }
}

  return (
    <section>
    <table className='table table-bordered table-hover shadow'>
      <thead>
        <tr className='text-center'>
            <th>ID</th>
            <th>Nom et Prénom</th>
            <th>Date de naissance</th>
            <th>Présence</th>
            <th>Cantine</th>
            <th>Photo</th>
            <th colSpan='3'>Actions</th>
        </tr>
      </thead>
      <tbody className='text-center'>
        {studentDTO.filter((student) => student.name.toLowerCase())
        .map((student, index)=>(
         <tr key={student.id}>
           <th scope='row' key={index}>{index + 1}</th>
           <td>{student.name}</td>
           <td>{student.birthday}</td>
           <td>{student.presence.toString()}</td>
           <td>{student.cantine.toString()}</td>
           <td>{student.profileImage ? (
            <img
            src={`http://localhost:8080/images/${student.id}/${student.profileImage}`}
            alt="profile image"
            style={{ width: '100px', height: '100px' }}
            />
            ) : (
            <span>No image</span>
            )}</td>
         <td className='mx-2'>
         <Link to={`/student-profile/${student.id}`} className='btn btn-info'><FaEye /></Link>
         </td>
         <td className='max-2'>
         <Link to={`/edit-student/${student.id}`} className='btn btn-warning'><FaEdit /></Link>
         </td>
         <td className='max-2'>
         <button className='btn btn-danger' onClick={()=> handleDelete(student.id)}><FaTrashAlt /></button>
         </td>
        </tr>
        ))}
      </tbody>  
    </table>
    </section>
  )
}

export default StudentsView

