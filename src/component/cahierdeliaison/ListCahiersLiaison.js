import React, { useEffect, useState } from 'react'
import { useAuth } from '../user/AuthProvider'
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'

const ListCahiersLiaison = () => {
  const {userName, role} = useAuth()
  const {studentId} = useParams()
  const navigate = useNavigate()
  const location = useLocation()
  const {name} = location.state || {}
  const [cahierDeLiaisonDTO, setCahierDeLiaisonDTO] = useState([])

  useEffect(()=> {
    loadCahierDeLiaison()
  }, [studentId])

  const loadCahierDeLiaison = async (e) =>{
  
    try{
      const response = await axios.get(`http://localhost:8080/cahierDeLiaison/all/${studentId}`,{withCredentials: true})
      setCahierDeLiaisonDTO(response.data)
    } catch(error){
      console.error('error : ', error)
    }
  }
  return (
    <section>
    <h2>Cahier de Liaison de : {name}</h2>
 <table>
 <thead>
   <tr>
       <th>ID</th>
       <th>Nom de L'Enseignant</th>
       <th>Titre</th>
       <th>Contenu</th>
       <th>Fait Le:</th>
       <th>Modifié Le:</th>
   </tr>
 </thead>
 <tbody>
   {cahierDeLiaisonDTO.map((cahierDeLiaison, index)=>(
   <tr key={cahierDeLiaison.id} onClick={ role =='ADMIN' ? () => navigate(`/show-cahier-de-liaison/${studentId}/${cahierDeLiaison.id}`, {state:{name}}) : null}
    style={{ cursor: role =='ADMIN' ? 'pointer' : 'default',
      opacity: role =='ADMIN' ? 1 : 0.8 }}>
      <th scope='row' key={index}>{index + 1}</th>
      <td>{userName}</td>
      <td>{cahierDeLiaison.title}</td>
      <td>{cahierDeLiaison.content}</td>
      <td>{cahierDeLiaison.local_date_time}</td>     
      <td>{cahierDeLiaison.modified_at}</td>     
   </tr>
   ))}
 </tbody> 
</table>
 {/*<button type='button'>
   <Link to={`/cahier-de-liaison/${studentId}`} state={{name}}>Retour</Link>                             
  </button>*/}  
    </section>
  )
}

export default ListCahiersLiaison