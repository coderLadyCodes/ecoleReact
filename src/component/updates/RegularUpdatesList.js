import React, { useEffect, useState } from 'react'
import { useAuth } from '../user/AuthProvider'
import axios from 'axios'
import { useNavigate, useParams } from 'react-router-dom'

const RegularUpdatesList = () => {
  const { role } = useAuth()
  const {studentId,ruId} = useParams()
  const navigate = useNavigate()
  const [regularUpdatesDTO, setRegularUpdatesDTO] = useState([])

  useEffect(() =>{
    loadRegularUpdatesList()
  }, [ruId])

  const loadRegularUpdatesList = async () => {
    try {
      const response = await axios.get('http://localhost:8080/updates',{withCredentials: true})
      setRegularUpdatesDTO(response.data)
    } catch(error){
      console.error('error : ', error)
    }
  }
                  //! MOVE THIS TO THE SHOWREGULARUPDATES
  const handleDelete = async (id) =>{
    let superAdminChoice = window.confirm('Etes vous sure de supprimer ce UPDATE?')
    if (superAdminChoice){
      try{
         await axios.delete(`http://localhost:8080/updates/${id}`,{withCredentials: true})
         loadRegularUpdatesList()
      } catch(error){
        console.error('error deleting the UPDATE : ', error)
      }
    }
  }
  return (
    <section>
       <h2>Les Informations récurrentes</h2>
    <table>
      <thead>
        <tr>
            <th>ID</th>
            <th>Date</th>
            <th>Fait le</th>
            <th>Modifié le</th>
            <th>Présence</th>
            <th>Cantine</th>
            <th>Garderie</th>
        </tr>
      </thead>
      <tbody>
        {regularUpdatesDTO.map((regularUpdates, index)=>(
         <tr key={regularUpdates.id} onClick={() => navigate(`/show-regular-updates/${studentId}/${ruId}`)}>
           <th scope='row' key={index}>{index + 1}</th>
           <td>{regularUpdates.local_date}</td>
           <td>{regularUpdates.local_date_time}</td>
           <td>{regularUpdates.modified_at}</td>
           <td>{regularUpdates.isAbsent.toString()}</td>
           <td>{regularUpdates.hasCantine.toString()}</td>
           <td>{regularUpdates.garderie}</td>     
        </tr>
        ))}
      </tbody>  
    </table>
    </section>
  )
}

export default RegularUpdatesList