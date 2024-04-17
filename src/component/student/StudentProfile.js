import axios from 'axios'
import React, { useEffect, useState } from 'react'
import {FaEdit, FaEye, FaTrashAlt} from 'react-icons/fa'
import { Link, useParams } from 'react-router-dom'

const StudentProfile = () => {

  const {userId} = useParams()
  const [studentDTO, setStudentDTO] = useState({
    name : '',
    birthday : null,
    presence : false,
    cantine : false,
    multipartFile: '',
  })

  useEffect(() =>{
    loadStudent()
  }, [])

  const loadStudent = async () =>{
    try{
      const result = await axios.get(`http://localhost:8080/students/${userId}`)
      setStudentDTO(result.data)
    }catch (error) {
      console.error('Error: ', error)
    }
  }
  return (
  
  <section className='d-flex flex-column'>
    <h2 className='mb-5 text-center'>Enfant</h2>
  <div className='d-flex justify-content-center'>
    <div className='column'>
  <div className='card' style={{width: '40rem'}}>
  <div className='card-body text-center'>
  <img
    src={`http://localhost:8080/images/${studentDTO.userId}/${studentDTO.profileImage}`}
    alt="photo"
    className="rounded-circle img-fluid"
    style={{ width: 120, height: 120}}
    />
    <h5 className="my-3">
      {`${studentDTO.name}`}
    </h5>
                      {/* CONNECT BUTTON TO EDIT LINK */}
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
  <hr />
   <button
    type="button"
    className="btn warning ms-2">
    <Link to={`/edit-student/${studentDTO.id}`}><FaEdit />Modifier</Link>                                       
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
