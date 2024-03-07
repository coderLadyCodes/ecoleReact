import axios from 'axios'
import React, { useEffect, useState } from 'react'
import {FaEdit, FaEye, FaTrashAlt} from 'react-icons/fa'
import { Link, useParams } from 'react-router-dom'

const StudentProfile = () => {

  const {id} = useParams()

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
      const result = await axios.get(`http://localhost:8080/students/${id}`)
      setStudentDTO(result.data)
    }catch (error) {
      console.error('Error: ', error)
    }
  }
  return (
  
  <section className='d-flex flex-column'>
  <div className='d-flex justify-content-center'>
    <div className='column'>
  <div className='card' style={{width: '40rem'}}>
  <div className='card-body text-center'>
  <img
    src={`http://localhost:8080/images/${studentDTO.id}/${studentDTO.profileImage}`}
    alt="photo"
    className="rounded-circle img-fluid"
    style={{ width: 120, height: 120}}
    />
    <h5 className="my-3">
      {`${studentDTO.name}`}
    </h5>
                      {/* CONNECT BUTTON TO EDIT LINK */}
  <div className="d-flex justify-content-center ms-6">
 
  <div className='card-body'>

  <hr />

  <div className='column d-flex justify-content-center'>
  <div className='col-sm-2'>
  <h5 className="mb-0">Nom et Prénom</h5>
  </div>
  <div className='col-sm-9'>
   <p className='text-muted mb-0'>{studentDTO.name}</p>
  </div>
  </div>

  <hr />

  <div className='column d-flex justify-content-center'>
  <div className='col-sm-2'>
  <h5 className="mb-0">Date de Naissance</h5>
  </div>
  <div className='col-sm-9'>
   <p className='text-muted mb-0'>{studentDTO.birthday}</p>
  </div>
  </div>
  <hr />

  <div className='column d-flex justify-content-center'>
  <div className='col-sm-2'>
  <h5 className="mb-0">Présence</h5>
  </div>
  <div className='col-sm-9'>
   <p className='text-muted mb-0'>{studentDTO.presence.toString()}</p>
  </div>
  </div>
  <hr />

  <div className='column d-flex justify-content-center'>
  <div className='col-sm-2'>
  <h5 className="mb-0">Cantine</h5>
  </div>
  <div className='col-sm-9'>
   <p className='text-muted mb-0'>{studentDTO.cantine.toString()}</p>
  </div>
  </div>
  <hr />
   <button
    type="button"
    className="btn warning ms-2">
    <Link to={`/edit-student/${studentDTO.id}`} className='btn btn-warning'><FaEdit />Modifier</Link>                                       
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
