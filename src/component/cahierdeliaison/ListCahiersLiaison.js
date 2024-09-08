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
      const orderCahier = response.data.sort((a,b) => new Date(b.local_date_time) - new Date(a.local_date_time))
      setCahierDeLiaisonDTO(orderCahier)
    } catch(error){
      console.error('error : ', error)
    }
  }
  return (
    <section>
    <h2>Cahier de Liaison de : {name}</h2>
    {cahierDeLiaisonDTO.map((cahierDeLiaison, index) => (
        <div 
          key={cahierDeLiaison.id}
          className="cahier-post"
          onClick={role === 'ADMIN' ? () => navigate(`/show-cahier-de-liaison/${studentId}/${cahierDeLiaison.id}`, { state: { name } }) : null}
          style={{ 
            cursor: role === 'ADMIN' ? 'pointer' : 'default',
            opacity: role === 'ADMIN' ? 1 : 0.8,
            border: '1px solid #ccc',
            borderRadius: '8px',
            padding: '16px',
            marginBottom: '20px',
            backgroundColor: '#f9f9f9',
          }}
        >
          <h3 style={{ marginBottom: '8px' }}>{cahierDeLiaison.title}</h3>
          <p style={{ marginBottom: '16px' }}>{cahierDeLiaison.content}</p>
          <div style={{ fontSize: '0.9em', color: '#666' }}>
            <p>Fait le: {cahierDeLiaison.local_date_time}</p>
            {cahierDeLiaison.modified_at && <p>Modifié le: {cahierDeLiaison.modified_at}</p>}
          </div>
        </div>
      ))}

 {/*<button type='button'>
   <Link to={`/cahier-de-liaison/${studentId}`} state={{name}}>Retour</Link>                             
  </button>*/}  
    </section>
  )
}

export default ListCahiersLiaison