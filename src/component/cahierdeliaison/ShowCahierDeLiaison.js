import React, { useEffect, useState } from 'react'
import {FaEdit, FaTrashAlt} from 'react-icons/fa'
import { useAuth } from '../user/AuthProvider'
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'
import './ShowCahierDeLiaison.css'

const ShowCahierDeLiaison = () => {
const {role} = useAuth()
const {user, userId, userName} = useAuth()
const navigate = useNavigate()
const location = useLocation()
const {name} = location.state || {}
const {studentId, id} = useParams()
const [cahierDeLiaisonDTO, setCahierDeLiaisonDTO] = useState({
    teacherId:userId,
    studentId:studentId,
    teacherName:userName,
    title:'',
    content:'',
    local_date_time:'',
    modified_at:'',
})

useEffect(() => {
    if (!user){
        navigate('/connexion')
    }
    loadShowCahierDeLiaison()
}, [])

const loadShowCahierDeLiaison = async(e) => {

    try{
        const response = await axios.get(`http://localhost:8080/cahierDeLiaison/${id}`, {withCredentials: true})
        //navigate(`/list-cahiers-liaison/${studentId}`, { state: { name } })
        setCahierDeLiaisonDTO(response.data)
    }catch (error) {
        console.error('Error: ', error)
      }
}

const handleDelete = async (id) => {
    let SuperChoice = window.confirm('Etes vous sure de supprimer ce Cahier de Texte?')
    if (SuperChoice){
        try{
            await axios.delete(`http://localhost:8080/cahierDeLiaison/${id}`,{withCredentials: true})
            loadShowCahierDeLiaison()
    }catch(error){
        console.error('erreur survenue lors de la suppression du cahier de liaison : ', error)
      }
}
}
  return (
    <section className="show-cahier-de-liaison">
    <h2>{name}</h2>
    <div className="show-cahier-de-liaison__teacher">
      <h5>Enseignant</h5>
      <p>{userName}</p>
    </div>

    <div className="show-cahier-de-liaison__title">
      <h5>Titre</h5>
      <p>{cahierDeLiaisonDTO.title}</p>
    </div>

    <div className="show-cahier-de-liaison__content">
      <h5>Contenu</h5>
      <p>{cahierDeLiaisonDTO.content}</p>
    </div>

    <div className="show-cahier-de-liaison__dates">
      <p>Créé le : {cahierDeLiaisonDTO.local_date_time}</p>
      <p>Modifié le : {cahierDeLiaisonDTO.modified_at}</p>
    </div>

    <div className="show-cahier-de-liaison__buttons">
      <button type="button">
        <Link to={`/edit-cahier-de-liaison/${cahierDeLiaisonDTO.studentId}/${cahierDeLiaisonDTO.id}`} state={{ name }}>
          <FaEdit /> Modifier
        </Link>
      </button>

      {role === 'SUPER_ADMIN' && (
        <div>
          <button type="button" onClick={() => handleDelete(cahierDeLiaisonDTO.id)}>
            <FaTrashAlt /> Supprimer
          </button>
          <Link to={'/students-view'}>Annuler</Link>
        </div>
      )}

      {role === 'PARENT' && (
        <button type="button">
          <Link to={`/student-profile/${cahierDeLiaisonDTO.studentId}`}>Retour</Link>
        </button>
      )}
    </div>
  </section>
  )
}

export default ShowCahierDeLiaison