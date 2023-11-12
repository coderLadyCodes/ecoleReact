{/*import React, {useEffect, useState } from 'react';
import {Link, useNavigate, useParams} from 'react-router-dom';
import axios from 'axios';

const EditUser = () => {

  let navigate = useNavigate();
  const {id} = useParams();

  const[user, setUser] = useState({
    name : '',
    email : '',
    phone : '',
    password : '',
    profileImage : '',
    role : '',
    postList : '',
    student : '',
  });
  const{name, email, phone, password, profileImage, role, postList, student} = user;

  useEffect(() =>{
    loadUser();
}, []);

const loadUser = async () =>{
    const result = await axios.get(`http://localhost:8080/user/${id}`);
        setUser(result.data);   
};

  const handleInputChange = (e) =>{
    setUser({...user, [e.target.name] : e.target.value})
  };
  const updateUser = async (e) => {
    e.preventDefault();
    await axios.put(`http://localhost:8080/user/update/${id}`, user);           // NOT SURE  USERS IN LINK
    navigate("/view-users");
};

  return (
    <div className='col-sm-8 py-2 px-5'>
        <h2 className='mt-5'>Edit User</h2>
      <form onSubmit={(e) => updateUser(e)}>
        <div className='input-group mb-5'>
          <label className='input-group-text' htmlFor='name'>Name</label>
          <input className='form-control col-sm-6' type='text' name='name' id='name' required value={name} onChange={(e) => handleInputChange(e)}/>
        </div>

        <div className='input-group mb-5'>
          <label className='input-group-text' htmlFor='email'>Email</label>
          <input className='form-control col-sm-6' type='email' name='email' id='email' required value={email} onChange={(e) => handleInputChange(e)}/>
        </div>

        <div className='input-group mb-5'>
          <label className='input-group-text' htmlFor='pnone'>Phone Number</label>
          <input className='form-control col-sm-6' type='number' name='phone' id='phone' required value={phone} onChange={(e) => handleInputChange(e)}/>
        </div>

        <div className='input-group mb-5'>
          <label className='input-group-text' htmlFor='password'>Password</label>
          <input className='form-control col-sm-6' type='password' name='password' id='password' required value={password} onChange={(e) => handleInputChange(e)}/>
        </div>

        <div className='input-group mb-5'>
          <label className='input-group-text' htmlFor='photo'>Photo</label>
          <input className='form-control col-sm-6' type='file' name='profileImage' id='profileImage' required value={profileImage} onChange={(e) => handleInputChange(e)}/>
        </div>

        <div className='input-group mb-5'>
          <label className='input-group-text' htmlFor='role'>Role</label>
          <input className='form-control col-sm-6' type='role' name='role' id='role' required value={role} onChange={(e) => handleInputChange(e)}/>
        </div>

        <div className='input-group mb-5'>
          <label className='input-group-text' htmlFor='postList'>Posts</label>
          <input className='form-control col-sm-6' type='postList' name='postList' id='postList' required value={postList} onChange={(e) => handleInputChange(e)}/>
        </div>

        <div className='input-group mb-5'>
          <label className='input-group-text' htmlFor='student'>Student</label>
          <input className='form-control col-sm-6' type='student' name='student' id='student' required value={student} onChange={(e) => handleInputChange(e)}/>
        </div>

        <div className='row mb-5'>
          <div className='col-sm-2'>
            <button type='submit' className='btn btn-outline-success btn-lg'>Save</button>
          </div>
          <div className='col-sm-2'>
            <Link to={"/view-users"} type='submit' className='btn btn-outline-warning btn-lg'>Cancel</Link>
          </div>
        </div>
      </form>
      
    </div>
  );
}

export default EditUser
*/}
/*value={profileImage}*/