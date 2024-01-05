import React, { useEffect, useLayoutEffect, useState } from 'react';
import axios from 'axios';
import {FaEdit, FaEye, FaTrashAlt} from 'react-icons/fa';
import {Link} from 'react-router-dom';
import SearchUser from '../common/SearchUser';

const UsersView = () => {
    const dummyData = [
        {
            "id":1,
            "name": "myname",
            "email": "myemail",
            "phone": "phone",
            "multipartFile": "multipartfile"
        },
         {
            "id":2,
            "name": "myname2",
            "email": "myemail2",
            "phone": "phone2",
            "multipartFile": "multipartfile2"
        }
    ]
const [users, setUsers] = useState([]);

const[search, setSearch] = useState("");
    useEffect(() =>{
        loadUsers();
    }, []);

    const loadUsers = async () =>{
        try{
        const result = await axios.get("http://localhost:8080/users");
        
            setUsers(result.data);   
    } catch (error) {
        console.error("error : ", error);
    }};

    const handleDelete = async(id) => {
        await axios.delete(`http://localhost:8080/user/delete/${id}`);
        loadUsers();
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
                {dummyData.filter((usr) => usr.name.toLowerCase().includes(search))
                .map((user, index)=>(
                 <tr key={user.id}>
                    <th scope="row" key={index}>
                        {index + 1}
                    </th>
                     <td>{user.name}</td>
                     <td>{user.email}</td>
                     <td>{user.phone}</td>
                     <td>{user.profileImage}</td>
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