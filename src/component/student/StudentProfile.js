import axios from 'axios'
import React, { useEffect, useState } from 'react'
import {FaEdit, FaEye, FaTrashAlt} from 'react-icons/fa'
import { Link, useNavigate, useParams} from 'react-router-dom'
import profil from '../../images/profil.jpg'
import { useAuth } from '../user/AuthProvider'


const StudentProfile = () => {
  const {user, role} = useAuth()
  const {id} = useParams()
  const navigate = useNavigate()
  const [studentDTO, setStudentDTO] = useState({
    name : '',
    birthday : null,
    classe:'',
    //presence : false,
    //cantine : false,
    multipartFile: '',
  })

  useEffect(() =>{
    if (!user){
     navigate('/connexion')
    }
    loadStudent()
  }, [user,id])

  const loadStudent = async () =>{
    try{
      const result = await axios.get(`http://localhost:8080/students/student/${id}`, {withCredentials: true})
      setStudentDTO(result.data)
    }catch (error) {
      console.error('Error: ', error)
    }
  }
  return (
  
  <section>
    <h2>Enfant : {studentDTO.name}</h2>
  <div>
    <div>
  <div style={{width: '40rem'}}>
  <div>
    {studentDTO.profileImage?
  <img
    src={`http://localhost:8080/images/${studentDTO.id}/${studentDTO.profileImage}`}
    alt="photo"
    style={{ width: 120, height: 120}}
    /> : <img src={profil} style={{width: 60, height: 60}}/> }
               
  <div>
 
  <div>

  <hr />

  <div>
  <div>
  <h5>Nom et Prénom</h5>
  </div>
  <div>
   <p>{studentDTO.name}</p>
  </div>
  </div>

  <hr />

  <div>
  <div>
  <h5>Date de Naissance</h5>
  </div>
  <div>
   <p>{studentDTO.birthday}</p>
  </div>
  </div>
  <hr />

  <div>
  <div>
  <h5>Classe</h5>
  </div>
  <div>
   <p>{studentDTO.classe}</p>
  </div>
  </div>
  <hr />

{/*  <div>
  <div>
  <h5>Présence</h5>
  </div>
  <div>
   <p>{studentDTO.presence.toString()}</p>
  </div>
  </div>
  <hr />

  <div>
  <div>
  <h5>Cantine</h5>
  </div>
  <div>
   <p>{studentDTO.cantine.toString()}</p>
  </div>
  </div>
  <hr />*/}
   <button type="button">
    <Link to={`/edit-student/${studentDTO.id}`}><FaEdit />Modifier</Link>                                       
  </button>
  { role == 'SUPER_ADMIN' && (
     <button type="button">
     <Link to={'/students-view'}>annuler</Link>                                  
   </button>
  )}

  { role == 'PARENT' && (
    <button type="button">
    <Link to={'/kids-parent'}>annuler</Link>   {/*TO BE CHECKED */}                                   
  </button>
  )}
  

  </div> 
  </div>
  </div>
  </div>
  </div>
  </div>
  </section>

  )
}

export default StudentProfile
