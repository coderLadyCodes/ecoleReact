import React, { useEffect, useState } from 'react'
import { useAuth } from '../user/AuthProvider'
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'
import './ListCahiersLiaison.css'

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
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/cahierDeLiaison/all/${studentId}`,{withCredentials: true})
     
      const orderCahier = response.data.sort((a, b) => {
        const dateA = parseDate(a.local_date_time)
        const dateB = parseDate(b.local_date_time)
        return dateB - dateA 
      })

      setCahierDeLiaisonDTO(orderCahier)

    } catch(error){
      console.error('error : ', error)
    }
  }
  const parseDate = (dateStr) => {
    // Split date and time
    const [datePart, timePart] = dateStr.split(' ')
    const [day, month, year] = datePart.split('/')
    return new Date(`${year}-${month}-${day}T${timePart}`)
  }

  return (
    <section className='list-cahiers-liaison'>
    <h2>Cahier de Liaison de : {name}</h2>
    {cahierDeLiaisonDTO.map((cahierDeLiaison) => (
      <div
        key={cahierDeLiaison.id}
        className='cahier-post'
        onClick={role === 'ADMIN' ? () => navigate(`/show-cahier-de-liaison/${studentId}/${cahierDeLiaison.id}`, { state: { name } }) : null}
      >
        <h3 className='cahier-title'>{cahierDeLiaison.title}</h3>
        <p className='cahier-content'>{cahierDeLiaison.content}</p>
        <div className='cahier-meta'>
          <p>Fait le: {cahierDeLiaison.local_date_time}</p>
          {cahierDeLiaison.modified_at && <p>Modifié le: {cahierDeLiaison.modified_at}</p>}
        </div>
      </div>
    ))}
    {/* Optional back button */}
    {/* <button type='button'>
      <Link to={`/cahier-de-liaison/${studentId}`} state={{ name }}>Retour</Link>
    </button> */}
  </section>
  )
}

export default ListCahiersLiaison