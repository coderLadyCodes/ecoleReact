import React, { useEffect, useState } from 'react'
import {FaEdit, FaTrashAlt} from 'react-icons/fa'
import { useAuth } from '../user/AuthProvider'
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'

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
    <section>
      <h2>{name}</h2>
    <div>
<h5>Enseignant</h5>
</div>
<div>
 <p>{userName}</p>
</div>

<div>
<h5>Titre</h5>
</div>
<div>
 <p>{cahierDeLiaisonDTO.title}</p>
</div>


<div>
<div>
<h5>Contenu</h5>
</div>
<div>
 <p>{cahierDeLiaisonDTO.content}</p>
</div>
</div>

<div>

 <p>crée le :{cahierDeLiaisonDTO.local_date_time}</p>

 <p>modifié le:{cahierDeLiaisonDTO.modified_at}</p>

</div>

 <button type='button'>
  <Link to={`/edit-cahier-de-liaison/${cahierDeLiaisonDTO.studentId}/${cahierDeLiaisonDTO.id}`}  state={{name}}><FaEdit />Modifier</Link>                                       
</button>
{ role === 'SUPER_ADMIN' && ( // ! NOT SURE
   <button type='button'>
   <Link to={'/students-view'}>annuler</Link>  
   <button onClick={()=> handleDelete(cahierDeLiaisonDTO.id)}><FaTrashAlt /></button>                                 
 </button>
)}

{ role === 'PARENT' && (  // ! NOT SURE
  <button type='button'>
  <Link to={`/student-profile/${cahierDeLiaisonDTO.studentId}`}>Retour</Link>                               
</button>
)}
</section>
  )
}

export default ShowCahierDeLiaison