import React, { useEffect, useState } from 'react'
import { useAuth } from '../user/AuthProvider'
import axios from 'axios'
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom'

const RegularUpdatesList = () => {
  const { role } = useAuth()
  const {studentId} = useParams()
  const navigate = useNavigate()
  const location = useLocation()
  const {name} = location.state || {}
  const [regularUpdatesDTO, setRegularUpdatesDTO] = useState([])

  useEffect(() =>{
    loadRegularUpdatesList()
  }, [studentId])

  const loadRegularUpdatesList = async () => {

    try {
      const response = await axios.get(`http://localhost:8080/updates/regular/${studentId}`,{withCredentials: true})
      setRegularUpdatesDTO(response.data)
    } catch(error){
      console.error('error : ', error)
    }
  }

  return (
    <section>
       <h2>Les Informations récurrentes pour : {name}</h2>
       {regularUpdatesDTO.map((regularUpdates, index)=>(
         <div 
         key={regularUpdates.id} 
         onClick={role === 'PARENT' ? () => navigate(`/show-regular-updates/${studentId}/${regularUpdates.id}`, { state: { name } }) : null}
         style={{
           cursor: role === 'PARENT' ? 'pointer' : 'default',
           opacity: role === 'PARENT' ? 1 : 0.8,
           border: '1px solid #ccc',
           borderRadius: '8px',
           padding: '16px',
           marginBottom: '20px',
           backgroundColor: '#f9f9f9',
         }}
         >

         <p><strong>Enfant:</strong> {name}</p>
         <p><strong>Date:</strong> {regularUpdates.local_date}</p>
         <p><strong>Fait le:</strong> {regularUpdates.local_date_time}</p>
         {regularUpdates.modified_at && <p><strong>Modifié le:</strong> {regularUpdates.modified_at}</p>}
         <p><strong>Absence:</strong> {regularUpdates.isAbsent ? 'Absent(e)' : 'Présent(e)'}</p>
         <p><strong>Cantine:</strong> {regularUpdates.hasCantine ? 'Cantine' : 'Pas Cantine'}</p>
         <p><strong>Garderie:</strong> {regularUpdates.garderie}</p>
       </div>
     ))}
       
   {/* <table>
      <thead>
        <tr>
            <th>ID</th>
            <th>Enfant</th>
            <th>Date</th>
            <th>Fait le</th>
            <th>Modifié le</th>
            <th>Absence</th>
            <th>Cantine</th>
            <th>Garderie</th>
        </tr>
      </thead>
      <tbody>
        {regularUpdatesDTO.map((regularUpdates, index)=>(
        <tr key={regularUpdates.id} onClick={ role == 'PARENT' ? () => navigate(`/show-regular-updates/${studentId}/${regularUpdates.id}`, {state:{name}}) : null }
         style={{ cursor: role =='PARENT' ? 'pointer' : 'default',
          opacity: role =='PARENT' ? 1 : 0.6 }}>
           <th scope='row' key={index}>{index + 1}</th>
           <td>{name}</td>
           <td>{regularUpdates.local_date}</td>
           <td>{regularUpdates.local_date_time}</td>
           <td>{regularUpdates.modified_at}</td>
           <td>{regularUpdates.isAbsent?  'Absent(e)' : 'Présent(e)'}</td>
           <td>{regularUpdates.hasCantine? 'Cantine' : 'Pas Cantine'}</td>
           <td>{regularUpdates.garderie}</td>     
        </tr>
        ))}
      </tbody> 
    </table>*/}
    { role == 'PARENT' && (
    <button type='button'>
    <Link to={`/regular-updates/${studentId}`} state={{name}}>Retour</Link>                               
  </button>
  )} 
    </section>
  )
}

export default RegularUpdatesList