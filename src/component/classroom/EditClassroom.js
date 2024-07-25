import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { useAuth } from '../user/AuthProvider'
import axios from 'axios'

const EditClassroom = () => {
    const {id} = useParams()
    let navigate = useNavigate()
    const {role, userId} = useAuth()
    const [classroom, setClassroom] =  useState({
      grade:'',
      userId:userId,
      classroomCode:'',
    })

      useEffect(() => {
        loadClassroom()
      }, [id])

      const loadClassroom = async () => {
        try{
            const result = await axios.get(`http://localhost:8080/classroom/${id}`, { withCredentials: true })
            setClassroom(result.data)
        }catch (error) {
            console.error('Error loading post details:', error)
          }
      }

      const handleChange = (e) => {
        const {name, value} = e.target
        setClassroom({...classroom, [name] : value})
      }

      const updateClassroom = async (e) => {
        e.preventDefault()
        try{
            const response = await axios.put(`http://localhost:8080/classroom/${id}`, classroom,{
                headers: {
                        'Content-Type': 'application/json'
              },
              withCredentials : true})  
              setClassroom(response.data) 
              navigate('/classrooms')  
        }catch(error) {
            console.error('Error:', error)
          }}
        
      
  return (
    <>
    { role == 'ADMIN' && (  
  <form onSubmit={updateClassroom}>
      <label htmlFor='grade'>Classe</label>
      <select name='grade' id='grade' value={classroom.classe} onChange={handleChange}>
        <option value='PETITE_SECTION'>Petite Section</option>
        <option value='MOYENNE_SECTION'>Moyenne Section</option>
        <option value='GRANDE_SECTION'>Grande Section</option>
        <option value='CP'>CP</option>
        <option value='CE1'>CE1</option>
        <option value='CE2'>CE2</option>
        <option value='CM1'>CM1</option>
        <option value='CM2'>CM2</option>
      </select>
      <button type='submit'>Save</button>
      <div>
          <Link to={'/classrooms'}  type='submit'>Cancel</Link>
      </div>
  </form>
       
    )}
    { role == 'SUPER_ADMIN' && (  
  <form onSubmit={updateClassroom}>
      <label htmlFor='grade'>Classe</label>
      <select name='grade' id='grade' value={classroom.classe} onChange={handleChange}>
        <option value='PETITE_SECTION'>Petite Section</option>
        <option value='MOYENNE_SECTION'>Moyenne Section</option>
        <option value='GRANDE_SECTION'>Grande Section</option>
        <option value='CP'>CP</option>
        <option value='CE1'>CE1</option>
        <option value='CE2'>CE2</option>
        <option value='CM1'>CM1</option>
        <option value='CM2'>CM2</option>
      </select>
      <button type='submit'>Save</button>
      <div>
          <Link to={'/classrooms'}  type='submit'>Cancel</Link>
      </div>
  </form>
       
    )}

</>    
  )
}

export default EditClassroom