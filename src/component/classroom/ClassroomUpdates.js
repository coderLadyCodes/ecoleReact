import axios from 'axios'
import React, { useEffect, useState } from 'react'
import './ClassroomUpdates.css'

const ClassroomUpdates = ({classroomId}) => {

    const [updates, setUpdates] =  useState([])

    useEffect(() => {
        const getUpdates = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/updates/classroom/${classroomId}`, { withCredentials: true })
                setUpdates(response.data)

            }catch (error) {
                console.error('Error fetching classroom updates:', error)
            }
        }
        getUpdates()
    }, [classroomId])
  return (
    <div className='classroom-updates'>
    <h2>Actualié des élèves</h2>
    <table>
        <thead>
            <tr>
                <th>Date</th>
                <th>Enfant</th>
                <th>Absence</th>
                <th>Cantine</th>
                <th>Garderie</th>
                <th>Fait le</th>
                <th>Modifié le</th>
            </tr>
        </thead>
        <tbody>
            {updates.map((update) => (
                <tr key={update.id}>
                    <td>{update.local_date}</td>
                    <td>{update.studentName}</td>  
                    <td>{update.isAbsent ? 'Absent' : 'Present'}</td>
                    <td>{update.hasCantine ? 'Cantine' : 'No Cantine'}</td>
                    <td>{update.garderie}</td>
                    <td>{update.local_date_time}</td>
                    <td >{update.modified_at}</td>
                </tr>
            ))}
        </tbody>
    </table>
</div>
  )
}

export default ClassroomUpdates