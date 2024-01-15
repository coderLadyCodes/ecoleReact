import React, { useState } from 'react';
import {Link, useNavigate} from 'react-router-dom';
import axios from 'axios';

const AddUser = () => {
let navigate = useNavigate();

const[name, setName] = useState('');
const[email, setEmail] = useState('');
const[phone, setPhone] = useState('');
const[multipartFile, setMultipartFile] = useState(null);

const [errors, setErrors] = useState({
  name:'',
  email:'',
  phone:'',
  multipartFile:''
})

const handleImage = (e) => {
console.log(e.target.files[0]);
setMultipartFile(e.target.files[0]);
};

const handleFormSubmit = async (e) =>{
  e.preventDefault();
  const formData = new FormData();
  formData.append("name", name);
  formData.append("email", email);
  formData.append("phone", phone);
  if(multipartFile){
    formData.append("multipartFile", multipartFile);
  }
  /*try{
    const response = await fetch("http://localhost:8080/users", {
      method: "POST",
      body: JSON.stringify(formData),
      headers: {'Content-Type': 'multipart/form-data'},
    });
    if (response.ok){
      console.log("file ok");
    }else {
      console.log("error");
    }
  } catch(error){
    console.log(error);
  }*/

   let userdto = JSON.stringify(formData);
    console.log("userDTO : " + userdto);

  try {
    const response =  await axios.post("http://localhost:8080/users" , userdto,  {
      headers: {"Content-Type": "multipart/form-data",}
    }); 
    navigate("/view-users"); 
    console.log(response.data);

  } catch (error) {
    if (error.response){
      console.log('Server Error:', error.response.data);   
  } else if (error.request) {
    console.error('No Response from Server:', error.request);
  } else {
    console.error('Request Setup Error:', error.message);
  }}
};

/*function validateForm(){
  let valid = true;
  const errorsCopy = {...errors};

  if(name.trim()){
    errorsCopy.name = '';
  }else {
    errorsCopy.name = 'Le Nom est Obligatoire';
    valid = false;
  }

  if(email.trim()){
    errorsCopy.email = '';
  }else {
    errorsCopy.email = 'Email est Obligatoire';
    valid = false;
  }

  if(phone.trim()){
    errorsCopy.phone = '';
  }else {
    errorsCopy.phone = 'Le Numéro de Tél est Obligatoire';
    valid = false;
  }
  return valid;
}*/

  return (
    <div className="container">
      <div className="row">
    <div className="d-flex justify-content-center">
    <div className="lg-4">
      <div className="card">
      <div className="card-body text-center">

      <h2 className='mb-5'>Add User</h2>

      <form onSubmit={handleFormSubmit} encType="multipart/form-data" method='post'>  {/* (e) => saveUser(e)*/} 

        <div className='input-group mb-5'>
          <label className='input-group-text' htmlFor='name'>Nom et Prénom</label>
          <input autoComplete="name" placeholder='Nom et Prénom' className='form-control col-sm-6' type='text' name='name' id='name' required value={name} onChange={(e) => setName(e.target.value)}/>
        </div>

        <div className='input-group mb-5'>
          <label className='input-group-text' htmlFor='email'>Email</label>
          <input autoComplete="email" placeholder='Email' className='form-control col-sm-6' type='email' name='email' id='email' required value={email} onChange={(e) => setEmail(e.target.value)}/>
        </div>

        <div className='input-group mb-5'>
          <label className='input-group-text' htmlFor='phone'>Numéro de Téléphone</label>
          <input autoComplete="tel" placeholder='Numero de Telephone' className='form-control col-sm-6' type='number' name='phone' id='phone' required value={phone} onChange={(e) => setPhone(e.target.value)}/>
        </div>

        
        <div className='input-group mb-5'>
          <label className='input-group-text' htmlFor='multipartFile'>Choisir une Photo</label>
          <input className='form-control col-sm-6' type='file' name='multipartFile' id='multipartFile' accept="image/*" required  onChange={handleImage}/>
        </div>

      {/*  <div className='input-group mb-5'>
          <label className='input-group-text' htmlFor='role'>Role</label>
          <input className='form-control col-sm-6' type='role' name='role' id='role' required value={role} onChange={(e) => handleInputChange(e)}/>
        </div>*/}

        <div className='row mb-5'>
          <div className='col-sm-6 p-4'>
            <button type='submit' className='btn btn-outline-success btn-ls'>Save</button>
          </div>
          <div className='col-sm-4 p-4'>
            <Link to={"/view-users"}  type='submit' className='btn btn-outline-warning btn-ls'>Cancel</Link> 
          </div>
        </div>
      </form>   
    </div>
    </div>
    </div>
    </div>
    </div>
    </div>
  );
}

export default AddUser;
