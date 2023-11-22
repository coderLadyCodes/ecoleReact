import React, { useState } from 'react';
import {Link, useNavigate} from 'react-router-dom';
import axios from 'axios';

const AddUser = () => {
  let navigate = useNavigate();
  const[user, setUser] = useState({
    name : '',
    email : '',
    phone : '',
    password : '',
    profileImage : '',
    student : {name : ''},
  });

  const{name, email, phone, password, profileImage,student} = user;

  const handleInputChange = (e) =>{
    setUser({...user, [e.target.name] : e.target.value})
  };

  const saveUser = async (e) => {
    e.preventDefault();
    //formValidation();
    try{
    const response = await axios.post("http://localhost:8080/user", user);
    console.log("user created : ", response.data);
    navigate("/view-users");
  } catch (error) {
    console.error("Error creating User :", error)
  }};
/* function formValidation(){
      // NAME
      if(name.length == 0){
        alert('le Nom est obligatoire')
      }

      // EMAIL
      if(email.length == 0){
        alert('l email est obligatoire');
      }

      // PHONE NUMBER
      const pattern = new RegExp(/^\d{1,10}$/);
      if(phone.length == 0 || !phone.match(pattern)){
        alert('Le numéro de télephone est obligatoire et correct');
      }

      // STUDENT
      if(student.length == 0){
        alert('le Nom de votre enfant est obligatoire');
      }

      // PASSWORD
      if(password.length < 8){
        alert('Le mot de passe doit avoir au minimum 8 characteres');
      }
    } */

  return (
    <div className='col-sm-8 py-2 px-5'>
      <h2 className='mt-5'>Add User</h2>
      <form onSubmit={saveUser}>  {/* (e) => saveUser(e)*/} 
        <div className='input-group mb-5'>
          <label className='input-group-text' htmlFor='name'>Nom et Prénom</label>
          <input autoComplete="name" placeholder='Nom et Prénom' className='form-control col-sm-6' type='text' name='name' id='name' required value={name} onChange={(e) => handleInputChange(e)}/>
        </div>

        <div className='input-group mb-5'>
          <label className='input-group-text' htmlFor='email'>Email</label>
          <input autoComplete="email" placeholder='Email' className='form-control col-sm-6' type='email' name='email' id='email' required value={email} onChange={(e) => handleInputChange(e)}/>
        </div>

        <div className='input-group mb-5'>
          <label className='input-group-text' htmlFor='phone'>Numéro de Téléphone</label>
          <input autoComplete="tel" placeholder='Numero de Telephone' className='form-control col-sm-6' type='number' name='phone' id='phone' required value={phone} onChange={(e) => handleInputChange(e)}/>
        </div>

        <div className='input-group mb-5'>
          <label className='input-group-text' htmlFor='password'>Mot de Passe</label>
          <input placeholder='Mot de Passe' className='form-control col-sm-6' type='password' name='password' id='password' required value={password} onChange={(e) => handleInputChange(e)}/>
        </div>

        <div className='input-group mb-5'>
          <label className='input-group-text' htmlFor='profileImage'>Photo</label>
          <input className='form-control col-sm-6' type='file' name='profileImage' id='profileImage' required value={profileImage} onChange={(e) => handleInputChange(e)}/>
        </div>

       {/* <div className='input-group mb-5'>
          <label className='input-group-text' htmlFor='role'>Role</label>
          <input className='form-control col-sm-6' type='role' name='role' id='role' required value={role} onChange={(e) => handleInputChange(e)}/>
        </div>*/}

        <div className='input-group mb-5'>
          <label  className='input-group-text' htmlFor='student'>Nom et Prénom de L'Enfant</label>
          <input  placeholder='Nom et Prénom de Votre Enfant' className='form-control col-sm-6' type='student' name='student' id='student' required value={student.name} onChange={(e) => handleInputChange(e)}/>
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

export default AddUser
