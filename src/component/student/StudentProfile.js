import axios from 'axios'
import React, { useEffect, useState } from 'react'
import {FaEdit, FaEye, FaTrashAlt} from 'react-icons/fa'
import { Link, useNavigate, useParams} from 'react-router-dom'
import profil from '../../images/profil.jpg'
import { useAuth } from '../user/AuthProvider'


const StudentProfile = () => {
  const {user} = useAuth()
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
  
  <section className='d-flex flex-column'>
    <h2 className='mb-5 text-center'>Enfant : {studentDTO.name}</h2>
  <div className='d-flex justify-content-center'>
    <div className='column'>
  <div className='card' style={{width: '40rem'}}>
  <div className='card-body text-center'>
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
  <button type="button">
    <Link to={'/kids-parent'}>annuler</Link>                                       
  </button>

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
