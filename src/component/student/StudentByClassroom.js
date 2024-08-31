import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { useAuth } from '../user/AuthProvider'
import profil from '../../images/profil.jpg'
import axios from 'axios'

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
            const result = await axios.get(`http://localhost:8080/students/${id}/classroom/${classroomId}`, { withCredentials: true })
            setStudentDTO(result.data)

        } catch(error) {
            console.error("Error:", error)
            if (error.response && error.response.status === 401) {
              navigate('/connexion')
          }
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
   <p>{studentDTO.grade}</p>
  </div>
  </div>
  <hr />

  <button type='button'>
    <Link to={`/classroom/${classroomId}/students`}>Retour</Link>                                      
  </button>

  </div> 
  </div>
  </div>
  </div>
  </div>
  </div>
  <div>
  <button type='button'>
    <Link to={`/show-list-updates/${id}`}>Absence, cantine, Garderie</Link>                                      
  </button>
  </div>
  </section>
  )
}

export default StudentByClassroom