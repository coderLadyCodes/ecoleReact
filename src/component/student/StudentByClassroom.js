import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { useAuth } from '../user/AuthProvider'
import profil from '../../images/profil.jpg'
import axios from 'axios'
import './StudentByClassroom.css'

const StudentByClassroom = () => {
    const {id, classroomId} = useParams()  
    const {user} = useAuth()
    const navigate = useNavigate()
    const[studentDTO, setStudentDTO] = useState({
      id:id,
        name : '',
        birthday : null,
        grade:'',
        multipartFile: '',
    })

    useEffect(() => {
        if (!user){
            navigate('/connexion')
        }else {
          loadStudentByClassroom()
      }
     

    }, [user, id, classroomId])

    const loadStudentByClassroom = async () => {
        try{
            const result = await axios.get(`${process.env.REACT_APP_API_URL}/students/${id}/classroom/${classroomId}`, { withCredentials: true })
            setStudentDTO(result.data)

        } catch(error) {
            console.error("Error:", error)
            if (error.response && error.response.status === 401) {
              navigate('/connexion')
          }
        }
    }
  return (
    <section className="student-by-classroom">
            <h2>Enfant : {studentDTO.name}</h2>
            <div className="student-info">
                {studentDTO.profileImage ? (
                    <img
                        //src={`${process.env.REACT_APP_API_URL}/images/${studentDTO.id}/${studentDTO.profileImage}`}
                        src={studentDTO.profileImage}
                        alt="photo"
                    />
                ) : (
                    <img src={profil} alt="profil" />
                )}
                <div className="student-details">
                    <div>
                        <h5>Nom et Prénom</h5>
                        <p>{studentDTO.name}</p>
                    </div>
                    <div>
                        <h5>Date de Naissance</h5>
                        <p>{studentDTO.birthday}</p>
                    </div>
                    <div>
                        <h5>Classe</h5>
                        <p>{studentDTO.grade}</p>
                    </div>
                </div>
            </div>

            <div className="button-container">
                <button type="button">
                    <Link to={`/classroom/${classroomId}/students`}>Retour</Link>
                </button>
                <button type="button">
                    <Link to={`/show-list-updates/${id}`}>Absence, cantine, Garderie</Link>
                </button>
                <button type="button">
                    <Link to={`/cahier-de-liaison/${id}`} state={{ name: studentDTO.name }}>Cahier De Liaison</Link>
                </button>
            </div>
        </section>
  )
}

export default StudentByClassroom