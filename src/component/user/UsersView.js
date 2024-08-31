import React, { useEffect, useLayoutEffect, useState } from 'react'
import axios from 'axios'
import {FaEdit, FaEye, FaTrashAlt} from 'react-icons/fa'
import {Link, useNavigate} from 'react-router-dom'
import { useAuth } from './AuthProvider'

const UsersView = () => {
const {role} = useAuth()
const navigate = useNavigate()
const [userDTO, setUserDTO] = useState([])

    useEffect(() =>{
        loadUsers()
    }, [])           

    const loadUsers = async () =>{
        try{
        const result = await axios.get('http://localhost:8080/users',{withCredentials: true})
        
        setUserDTO(result.data)

    } catch (error) {
        console.error("error : ", error)
    }}

    const handleDelete = async(id) => {
      let userChoice = window.confirm('Voulez vous supprimer ce contacte?')
      if(userChoice){
        await axios.delete(`http://localhost:8080/users/${id}`,{withCredentials: true})
        loadUsers()
      }
    }


  return (
    <>
      {role == 'SUPER_ADMIN' && (
       <section>
       <h2>Liste des utilisateurs</h2>
       <table>
           <thead>
              <tr>
               <th>ID</th>
               <th>Nom</th>
               <th>Email</th>
               <th>Tél</th>
               <th>Photo</th>
               <th>Actions</th>
              </tr>
           </thead>

           <tbody>
               {userDTO.filter((usr) => usr.name.toLowerCase() && usr.role !== 'SUPER_ADMIN')
               .map((user, index)=>(
               
                <tr key={user.id} onClick={() => navigate(`/user-profile/${user.id}`)} style={{ cursor: 'pointer' }}>
                   <th scope='row' key={index}>
                       {index + 1}
                   </th>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                    <td>{user.phone}</td>
                    <td> {user.profileImage ? (
                         <img
                         src={`http://localhost:8080/images/${user.id}/${user.profileImage}`}
                         alt="profile image"
                         style={{ width: '100px', height: '100px' }}
                         />
                           ) : (
                                 <span>No image</span>
                           )}</td>               
                     <td>
                      { user.role !== 'SUPER_ADMIN' && (
                        <button onClick={()=> handleDelete(user.id)}><FaTrashAlt /></button>
                      )}
                    </td>                    
                </tr>
               ))}
           </tbody>
       </table>
       </section> 
      )}
        
     </>
  )
 
}

export default UsersView