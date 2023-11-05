import React, { useEffect, useState } from 'react';
import axios from 'axios';

const UsersView = () => {
const [users, setUsers] = useState([]);
    useEffect(() =>{
        loadUsers();
    }, []);

    const loadUsers = async () =>{
        const result = await axios.get("http://localhost:8080/users");
        
            setUsers(result.data);   
    };

  return (
    <section>
        <table className='table table-bordered table-hover'>
            <thead>
               <tr className='text-center'>
                <th>ID</th>
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Profile Image</th>
                <th>Role</th>
                <th>Student ID</th>
                <th colSpan='3'>Actions</th>
               </tr>
            </thead>

            <tbody className='textècenter'>
                {users.map((user, index)=>(
                 <tr key={user.id}>
                    <th scope="row" key={index}>
                        {index + 1}
                    </th>
                     <td>{user.name}</td>
                     <td>{user.email}</td>
                     <td>{user.phone}</td>
                     <td>{user.profileImage}</td>
                     <td>{user.role}</td>
                     <td>{user.student.name}</td>
                     <td className='mx-2'>
                        <button className='btn btn-info'>View</button>
                        </td>
                     <td className='max-2'>
                     <button className='btn btn-warning'>Update</button>
                     </td>
                     <td className='max-2'>
                     <button className='btn btn-danger'>Delete</button>
                     </td>
                 </tr>
                ))}
            
            </tbody>
        </table>
      
    </section>
  );
};

export default UsersView
