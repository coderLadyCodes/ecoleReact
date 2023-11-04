import React from 'react'

const UsersView = () => {
    const [users, setUsers] = useState([]);
  return (
    <section>
        <table>
            <thead>
               <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Profile Image</th>
                <th>Role</th>
                <th>List of Posts</th>
                <th>Student ID</th>
                <th>Actions</th>
               </tr>
            </thead>

            <tbody>
                {users.map((student, index)=>(
                 <tr key={users.id}>
                    <th scope="row" key={index}>
                        {index + 1}
                    </th>
                     <td>{users.name}</td>
                     <td>{users.email}</td>
                     <td>{users.phone}</td>
                     <td>{users.profileImage}</td>
                     <td>{users.role}</td>
                     <td>{users.postList}</td>
                     <td>{users.student}</td>
                     <td>View</td>
                     <td>Update</td>
                     <td>Delete</td>
                 </tr>
                ))}
            
            </tbody>
        </table>
      
    </section>
  )
}

export default UsersView
