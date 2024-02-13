import React, { useEffect, useLayoutEffect, useState } from 'react';
import axios from 'axios';
import {FaEdit, FaEye, FaTrashAlt} from 'react-icons/fa';
import {Link} from 'react-router-dom';
import SearchUser from '../common/SearchUser';

const UsersView = () => {
 
const [userDTO, setUserDTO] = useState([]);
const[search, setSearch] = useState("");

    useEffect(() =>{
        loadUsers();
    }, []);

    const loadUsers = async () =>{
        try{
        const result = await axios.get("http://localhost:8080/users");
        
        setUserDTO(result.data);   
    } catch (error) {
        console.error("error : ", error);
    }};

    const handleDelete = async(id) => {
      let userChoice = window.confirm("Voulez vous supprimer ce contacte?");
      if(userChoice){
        await axios.delete(`http://localhost:8080/users/${id}`);
        loadUsers();
      }
    }


  return (
    <section>
        <SearchUser  search={search} setSearch={setSearch}/>
        <table className='table table-bordered table-hover shadow'>
            <thead>
               <tr className='text-center'>
                <th>ID</th>
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Profile Image</th>
                <th colSpan='3'>Actions</th>
               </tr>
            </thead>

            <tbody className='text-center'>
                {userDTO.filter((usr) => usr.name.toLowerCase().includes(search))
                .map((user, index)=>(
                 <tr key={user.id}>
                    <th scope="row" key={index}>
                        {index + 1}
                    </th>
                     <td>{user.name}</td>
                     <td>{user.email}</td>
                     <td>{user.phone}</td>
                     <td>{user.profileImage !== null ? (
                                        <img src={user.profileImage} alt="img" style={{ width: '20px', height: '20px' }} />
                                    ) : (
                                        <span>No image</span>
                                    )}</td>
                     <td className='mx-2'>
                        <Link to={`/user-profile/${user.id}`} className='btn btn-info'><FaEye /></Link>
                        </td>
                     <td className='max-2'>
                     <Link to={`/edit-user/${user.id}`} className='btn btn-warning'><FaEdit /></Link>
                     </td>
                     <td className='max-2'>
                     <button className='btn btn-danger' onClick={()=> handleDelete(user.id)}><FaTrashAlt /></button>
                     </td>
                 </tr>
                ))}
            
            </tbody>
        </table>
      
    </section>
  );
};

export default UsersView