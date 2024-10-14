import axios from 'axios'
import React, { useEffect, useState } from 'react'
import {FaEdit, FaEye, FaTrashAlt} from 'react-icons/fa'
import { Link, useLocation, useNavigate, useParams} from 'react-router-dom'
import profil from '../../images/profil.jpg'
import { useAuth } from '../user/AuthProvider'
import './StudentProfile.css'


const StudentProfile = () => {
  const {user, role} = useAuth()
  const {id} = useParams()
  const navigate = useNavigate()
  const [studentDTO, setStudentDTO] = useState({
    name : '',
    birthday : null,
    grade:'',
    multipartFile: '',
  })

  useEffect(() =>{
    if (!user){
     navigate('/connexion')
    } else{
      loadStudent()
    } 
    
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
    <>
    
    <section className="student-profile-container">
        <h2 className="student-profile-header">Enfant : {studentDTO.name}</h2>
        <div className="student-profile-card">
          <div>
            {studentDTO.profileImage ? (
              <img
                src={`http://localhost:8080/images/${studentDTO.id}/${studentDTO.profileImage}`}
                alt="profile"
                className="student-profile-image"
              />
            ) : (
              <img src={profil} alt="default profile" className="student-profile-image" />
            )}
          </div>

          <div className="student-profile-info">
            <div>
              <h5>Nom et Prénom</h5>
              <p>{studentDTO.name}</p>
            </div>

            <hr />

            <div>
              <h5>Date de Naissance</h5>
              <p>{studentDTO.birthday}</p>
            </div>

            <hr />

            <div>
              <h5>Classe</h5>
              <p>{studentDTO.grade}</p>
            </div>

            <div className="student-profile-btn-group">
              <button type="button">
                <Link to={`/edit-student/${studentDTO.id}`}>
                  <FaEdit /> Modifier
                </Link>
              </button>

              {role === 'SUPER_ADMIN' && (
                <button type="button">
                  <Link to={'/students-view'}>Annuler</Link>
                </button>
              )}

              {role === 'PARENT' && (
                <button type="button">
                  <Link to={'/kids-parent'}>Annuler</Link>
                </button>
              )}
            </div>
          </div>
        </div>

        <div className="student-profile-btn-group">
          <button type="button">
            <Link to={`/regular-updates/${studentDTO.id}`} state={{ name: studentDTO.name }}>
              Absence, Cantine, Garderie
            </Link>
          </button>
        </div>

        <div className="student-profile-btn-group">
          <button type="button">
            <Link to={`/list-cahiers-liaison/${studentDTO.id}`} state={{ name: studentDTO.name }}>
              Cahiers de Liaison
            </Link>
          </button>
        </div>
      </section>
  </>

  )
}

export default StudentProfile
